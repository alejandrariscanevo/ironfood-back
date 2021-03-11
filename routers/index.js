const express = require('express');
const { default: dataProductsView } = require('../dataProductsView');
const router  = express.Router();
import dataProductsView from './data.js'
import mongoose from 'mongoose';
import userRouter from './userRouter.js';
import productRouter from './productRouter.js';

mongoose.connect('mongodb://localhost/ironfood', {
  userNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

/* GET home page */
router.get('/', (req, res, next) => {
  res.status(200).json({message:'index'});
});
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);

app.get('api/products', (req,res) => {
  res.send(dataProductsView.products);
}) 

module.exports = router;
