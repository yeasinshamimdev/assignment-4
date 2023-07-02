import express from 'express';
import { AuthRouter } from '../modules/auth/auth.route';
import { CowRouter } from '../modules/cow/cow.route';
import { UserRouter } from '../modules/user/user.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRouter,
  },
  {
    path: '/user',
    route: UserRouter,
  },
  {
    path: '/cow',
    route: CowRouter,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
