import express from 'express';
import { AuthRouter } from '../modules/auth/auth.route';
import { CowRouter } from '../modules/cow/cow.route';
import { OrderRouter } from '../modules/order/order.route';
import { UserRouter } from '../modules/user/user.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRouter,
  },
  {
    path: '/users',
    route: UserRouter,
  },
  {
    path: '/cows',
    route: CowRouter,
  },
  {
    path: '/orders',
    route: OrderRouter,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
