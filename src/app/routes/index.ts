import express from 'express';
import { AdminRouter } from '../modules/admin/admin.route';
import { AuthRouter } from '../modules/auth/auth.route';
import { BuyerRouter } from '../modules/buyer/buyer.route';
import { CowRouter } from '../modules/cow/cow.route';
import { OrderRouter } from '../modules/order/order.route';
import { SellerRouter } from '../modules/seller/seller.route';
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
  {
    path: '/admins',
    route: AdminRouter,
  },
  {
    path: '/buyers',
    route: BuyerRouter,
  },
  {
    path: '/sellers',
    route: SellerRouter,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
