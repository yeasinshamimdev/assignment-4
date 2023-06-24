import cors from 'cors';
import express, { Application } from 'express';
import globalErrorHandler from './app/midleware/globalErrorHandler';
import router from './app/routes';

const app: Application = express();

app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/', router);

app.use(globalErrorHandler);

export default app;
