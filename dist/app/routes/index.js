'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const auth_route_1 = require('../modules/auth/auth.route');
const cow_route_1 = require('../modules/cow/cow.route');
const order_route_1 = require('../modules/order/order.route');
const user_route_1 = require('../modules/user/user.route');
const router = express_1.default.Router();
const moduleRoutes = [
  {
    path: '/auth',
    route: auth_route_1.AuthRouter,
  },
  {
    path: '/user',
    route: user_route_1.UserRouter,
  },
  {
    path: '/cow',
    route: cow_route_1.CowRouter,
  },
  {
    path: '/order',
    route: order_route_1.OrderRouter,
  },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
