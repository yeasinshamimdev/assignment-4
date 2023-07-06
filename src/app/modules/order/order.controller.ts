import { Request, Response } from 'express';
import { startSession } from 'mongoose';
import { Cow } from '../cow/cow.model';
import { User } from '../user/user.model';
import { IOrder } from './order.interface';
import { Order } from './order.model';

const createOrder = async (req: Request, res: Response) => {
  try {
    const { cow: cowId, buyer: buyerId } = req.body;

    const session = await startSession();
    session.startTransaction();

    try {
      const cow = await Cow.findById(cowId).session(session);
      const buyer = await User.findById(buyerId).session(session);

      if (!cow || !buyer) {
        throw new Error('Invalid cow or buyer ID');
      }

      if (typeof buyer.budget !== 'number' || buyer.budget < cow.price) {
        throw new Error('Insufficient funds to buy the cow');
      }

      cow.label = 'sold out';
      buyer.budget -= cow.price;
      if (typeof cow.seller === 'object') {
        const seller = await User.findById(cow.seller).session(session);
        if (seller) {
          seller.income += cow.price;
          await seller.save();
        }
      }

      await cow.save();

      const order = new Order({ cow: cowId, buyer: buyerId });
      await order.save();

      await session.commitTransaction();

      res.status(201).json({
        success: true,
        statusCode: 201,
        message: 'Order created successfully',
        data: order,
      });
    } catch (error: any) {
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Failed to create order',
      error: error.message,
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders: IOrder[] = await Order.find();

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Orders retrieved successfully',
      data: orders,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Failed to retrieve orders',
      error: error.message,
    });
  }
};

export { createOrder, getAllOrders };
