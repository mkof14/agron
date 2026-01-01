
import { VercelRequest, VercelResponse } from '@vercel/node';
import { buildApp } from '../backend/src/app';

let appInstance: any;

const getApp = async () => {
  if (!appInstance) {
    appInstance = await buildApp();
    await appInstance.ready();
  }
  return appInstance;
};

export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    const app = await getApp();
    app.server.emit('request', req, res);
  } catch (error) {
    console.error('CRITICAL_INIT_ERROR:', error);
    if (!res.writableEnded) {
      res.status(500).send({
        error: 'System Initialization Failed',
        detail: error instanceof Error ? error.message : 'Unknown'
      });
    }
  }
};
