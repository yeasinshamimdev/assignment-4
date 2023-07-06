'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.getAllOrders = exports.createOrder = void 0;
const mongoose_1 = require('mongoose');
const cow_model_1 = require('../cow/cow.model');
const user_model_1 = require('../user/user.model');
const order_model_1 = require('./order.model');
const createOrder = async (req, res) => {
  try {
    const { cow: cowId, buyer: buyerId } = req.body;
    const session = await (0, mongoose_1.startSession)();
    session.startTransaction();
    try {
      const cow = await cow_model_1.Cow.findById(cowId).session(session);
      const buyer = await user_model_1.User.findById(buyerId).session(session);
      if (!cow || !buyer) {
        throw new Error('Invalid cow or buyer ID');
      }
      if (typeof buyer.budget !== 'number' || buyer.budget < cow.price) {
        throw new Error('Insufficient funds to buy the cow');
      }
      cow.label = 'sold out';
      buyer.budget -= cow.price;
      if (typeof cow.seller === 'object') {
        const seller = await user_model_1.User.findById(cow.seller).session(
          session
        );
        if (seller) {
          seller.income += cow.price;
          await seller.save();
        }
      }
      await cow.save();
      const order = new order_model_1.Order({ cow: cowId, buyer: buyerId });
      await order.save();
      await session.commitTransaction();
      res.status(201).json({
        success: true,
        statusCode: 201,
        message: 'Order created successfully',
        data: order,
      });
    } catch (error) {
      await session.abortTransaction();
      res.status(500).json({
        success: false,
        statusCode: 500,
        message: 'Failed to create order',
        error: error.message,
      });
    } finally {
      session.endSession();
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Failed to create order',
      error: error.message,
    });
  }
};
exports.createOrder = createOrder;
const getAllOrders = async (req, res) => {
  try {
    const orders = await order_model_1.Order.find();
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Orders retrieved successfully',
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Failed to retrieve orders',
      error: error.message,
    });
  }
};
exports.getAllOrders = getAllOrders;
