import express from 'express';
import { cartRouter } from './cart/cart.router.js';
import { productsRouter } from './products/products.router.js';


const apiRouter = express.Router();
apiRouter.use('/products', productsRouter);
apiRouter.use('/cart', cartRouter);

export { apiRouter };

