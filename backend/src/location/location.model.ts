import * as mongoose from 'mongoose';
import { Review, ReviewSchema } from 'src/review/review.model';
export const LocationSchema = new mongoose.Schema({
  category: { type: [String] },
  keyword: { type: [String], required: true },
  name: { type: String, required: true },
  location: { type: String, required: true },
  googleMap: { type: String, required: true },
  openClose: { type: String, required: true },
  price: { type: String, required: true },
  phone: { type: String, required: true },
  website: { type: String, required: true },
  img: { type: String, required: true },
  detail: { type: String, required: true },
  review: { type: [ReviewSchema], required: true },
});

export interface Location extends mongoose.Document {
  id: string;
  category: [string];
  keyword: [string];
  name: string;
  location: string;
  googleMap: string;
  openClose: string;
  price: string;
  phone: string;
  website: string;
  img: string;
  detail: string;
  review: Review[];
}