import * as mongoose from 'mongoose';

export const ReviewSchema = new mongoose.Schema({
    username: {type: String, required: true},
    description: {type: String, required: true},
},{ timestamps: true, });

export interface Review extends mongoose.Document {
    id: string;
    username: string;
    description: string;
}