export enum UserRole {
  TRAINEE = 'TRAINEE',
  INSTRUCTOR = 'INSTRUCTOR',
  ADMIN = 'ADMIN'
}

export interface TrainingModule {
  id: string;
  title: string;
  level: 'Foundational' | 'Advanced' | 'Instructor';
  duration: string;
  category: 'Aerial' | 'Ground' | 'Hybrid';
  status: 'Not Started' | 'In Progress' | 'Certified';
}

export interface SimulationScenario {
  id: string;
  title: string;
  environment: string;
  weatherConditions: string;
  riskLevel: 'Low' | 'Moderate' | 'Critical';
  objectives: string[];
  safetyProtocols: string[];
}

export interface OperatorProfile {
  id: string;
  fullName: string;
  callsign: string;
  clearanceLevel: string;
  certifications: string[];
  flightHours: number;
  lastAssessmentDate: string;
}

export interface SystemBackup {
  version: string;
  timestamp: string;
  profile: OperatorProfile;
  missions: SimulationScenario[];
}

export interface GeminiResponse {
  text: string;
}