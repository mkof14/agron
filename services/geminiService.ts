
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { SimulationScenario } from '../types';

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found in environment variables");
  }
  return new GoogleGenAI({ apiKey });
};

/**
 * Utility for exponential backoff retries on API calls.
 */
async function withRetry<T>(fn: () => Promise<T>, retries = 3, delay = 1000): Promise<T> {
  try {
    return await fn();
  } catch (error: any) {
    const isQuotaError = error?.message?.includes('429') || error?.status === 429;
    if (retries > 0 && isQuotaError) {
      console.warn(`AGRON_SYS: Quota limited. Retrying in ${delay}ms... (${retries} attempts left)`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return withRetry(fn, retries - 1, delay * 2);
    }
    throw error;
  }
}

export const generateHeroImage = async (prompt: string): Promise<string | null> => {
  const ai = getClient();
  const model = "gemini-2.5-flash-image";

  try {
    // FIX: Explicitly type response to GenerateContentResponse to resolve 'unknown' property errors (lines 45-46)
    const response: GenerateContentResponse = await withRetry(() => ai.models.generateContent({
      model,
      contents: { parts: [{ text: prompt }] },
      config: {
        imageConfig: {
          aspectRatio: "16:9"
        }
      }
    }));

    if (response.candidates && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    return null;
  } catch (error: any) {
    if (error?.message?.includes('429')) {
      console.error("AGRON_NOC: AI Image Generation Quota Exhausted. Switching to local institutional fallback.");
    } else {
      console.error("AGRON_NOC: Hero image generation failed:", error);
    }
    return null;
  }
};

export const generateSimulationScenario = async (
  environment: string,
  complexity: string,
  systemType: string
): Promise<SimulationScenario> => {
  const ai = getClient();
  const model = "gemini-3-flash-preview";

  const systemInstruction = `
    You are the Senior Training Director for AGRON (Aerial–Ground Robotics Operations Network).
    Your role is to generate rigorous, infrastructure-grade training simulation scenarios.
    
    TONE:
    - Institutional, technical, and safety-critical.
    - No marketing fluff.
    - Focus on operational readiness, risk management, and protocol adherence.
    
    OUTPUT:
    - Strictly valid JSON format adhering to the schema.
    - Risk Level must be one of: "Low", "Moderate", "Critical".
  `;

  const prompt = `
    Generate a training scenario for a ${systemType} system in a ${environment} environment.
    Complexity Level: ${complexity}.
    
    Include specific operational objectives and mandatory safety protocols.
  `;

  try {
    // FIX: Explicitly type response to GenerateContentResponse to resolve 'unknown' property errors (line 121)
    const response: GenerateContentResponse = await withRetry(() => ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            title: { type: Type.STRING },
            environment: { type: Type.STRING },
            weatherConditions: { type: Type.STRING },
            riskLevel: { type: Type.STRING, enum: ["Low", "Moderate", "Critical"] },
            objectives: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            safetyProtocols: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["title", "environment", "riskLevel", "objectives", "safetyProtocols"]
        }
      }
    }));

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as SimulationScenario;
  } catch (error: any) {
    if (error?.message?.includes('429')) {
      console.error("AGRON_NOC: Simulation Generator Quota Exhausted. Using deterministic local parameters.");
    } else {
      console.error("AGRON_NOC: Scenario generation failed:", error);
    }
    
    // Fallback scenario in case of error to maintain UI stability
    return {
      id: "fallback-001",
      title: "Standard Operational Check (Deterministic)",
      environment: environment,
      weatherConditions: "Nominal - Standard Field Conditions",
      riskLevel: "Low",
      objectives: ["Execute pre-flight system diagnostics", "Establish secure C2 link", "Verify telemetry integrity"],
      safetyProtocols: ["Maintain Visual Line of Sight (VLOS)", "Observe 50ft buffer from obstacles", "Monitor cell voltage variance"]
    };
  }
};
