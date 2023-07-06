import mongoose, { Schema } from 'mongoose';
import { IOrder } from './order.interface';

const OrderSchema: Schema = new Schema({
  cow: { type: Schema.Types.ObjectId, ref: 'Cow', required: true },
  buyer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export const Order = mongoose.model<IOrder>('Order', OrderSchema);
