
import mongoose from 'mongoose';

var connectionURL = 'mongodb://mongo-db:27017/users'

export const db = mongoose.connect(connectionURL)
  .then(() => console.log(`Connected to ${connectionURL}`))
  .catch((error) => console.log(error));