import express from 'express';
import dataProductsView from '../dataProductsView';
import User from '../models/User';

const userRouter = express.Router();

userRouter. get('/seed', async(req, res) => {
  const createdUsers = await User.insertMany(dataProductsView.users);
  res.send({ createdUsers });
});

export default userRouter;