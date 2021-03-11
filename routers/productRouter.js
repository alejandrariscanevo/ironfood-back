import express from 'express';
import Product from '../models/productModel';
import dataProductsView from '../dataProductsView';

const productRouter = express.Router();

productRouter.get('/seed', expressAsyncHandler(async(req, res) =>{
  const createdProducts = await Product.insertMany(dataProductsView.products);
  res.send({ createdProducts });
})
);

export default productRouter;