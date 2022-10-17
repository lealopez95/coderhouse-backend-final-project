import express from 'express';
import { Cart } from '../../../entities/Cart.js';
import { CartEntityProvider } from '../../../entity-providers/CartService.js';

const cartRouter = express.Router();
const cartManager = new CartEntityProvider();

cartRouter.post('/', async (req, res) => {
    const cart = new Cart();
    const response = await cartManager.save(cart);
    res.json( response)
});

cartRouter.delete('/:id', async (req, res) => {
    const id = req.params.id;
    if(!id) {
        return res.status(400).json({
            error: -1,
            message: 'id needed'
        });
    }
    const deletedCart = await cartManager.deleteById(id);
    res.json({ deletedCart });
});

cartRouter.get('/:id/products', async (req, res) => {
    const { id } = req.params;
    const cart = await cartManager.findById(id);
    if(!cart) {
        return res.status(404).json({
            error: -1,
            message: 'id not found'
        }); 
    }
    res.json(cart.getProducts());
});

cartRouter.post('/:id/products', async (req, res) => {
    const { id } = req.params;
    const { productIds } = req.body;
    if(!id || !productIds) {
        return res.status(400).json({
            error: -1,
            message: 'wrong params'
        });
    }
    const cart = await cartManager.findById(id);
    if(!cart) {
        return res.status(404).json({
            error: -1,
            message: 'id not found'
        }); 
    }
    const results = await cartManager.addProductsByIds(cart, productIds);
    res.json(results);
});

cartRouter.delete('/:id/products/:productId', async (req, res) => {
    const { id, productId } = req.params;
    if(!id || !productId) {
        return res.status(400).json({
            error: -1,
            message: 'wrong params'
        });
    }
    const cart = await cartManager.findById(id);
    if(!cart) {
        return res.status(404).json({
            error: -1,
            message: 'id not found'
        }); 
    }
    const deletedProuduct = await cartManager.deleteProductById(cart, +productId);
    res.json({deletedProuduct});
});


export { cartRouter };