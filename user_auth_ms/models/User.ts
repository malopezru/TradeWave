import mongoose, { Schema } from "mongoose"

var UserModel = new Schema({
    _id: { type: Number, required: true },
    name: { type: String },
    email: { type: String },
    password: { type: String }
});

export const User = mongoose.model('users', UserModel);