import { Request, Response } from 'express';
import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { errorLogger, logger } from './shared/logger';

main().catch(err => console.log(err));

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    app.get('/', (req: Request, res: Response) => {
      res.send('Hello World!');
    });

    app.listen(config.port, () => {
      logger.info(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    errorLogger.error(error);
  }
}
