import { Schema, model } from 'mongoose';
import { cowBreed, cowCategory, cowLavel, cowLocation } from './cow.constant';
import { ICow, ICowModel } from './cow.interface';

const cowSchema = new Schema<ICow, ICowModel>(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    price: { type: Number, required: true },
    location: { type: String, enum: cowLocation, required: true },
    breed: { type: String, enum: cowBreed, required: true },
    weight: { type: Number, required: true },
    label: { type: String, enum: cowLavel, default: 'for sale' },
    category: { type: String, enum: cowCategory, required: true },
    seller: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true
    }
  }
);

export const Cow = model<ICow, ICowModel>('Cow', cowSchema);
