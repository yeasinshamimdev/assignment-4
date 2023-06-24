import express from 'express';
import { UserRouter } from '../modules/user/user.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/',
    route: UserRouter,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
