import express from 'express';
import { validateIsAdminMiddleware } from '../../middlewares/auth.middleware.js';
import { ProductsEntityProvider } from '../../../entity-providers/ProductsService.js';
import { Product } from '../../../entities/Product.js';

const productsRouter = express.Router();
const productsManager = new ProductsEntityProvider(); 


productsRouter.get('/', async (req, res) => {
    const response = await productsManager.getAll();
    res.json(response);
});

productsRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    const response = await productsManager.findById(id);
    if(!response) {
        return res.status(404).json({
            error: -1,
            message: 'id not found'
        }); 
    }
    res.json(response);
});

productsRouter.post('/', validateIsAdminMiddleware, async (req, res) => {
    const { name, code, image, price, stock } = req.body;
    if(!name || !code || !image || !price || !stock) {
        return res.status(400).json({
            error: -1,
            message: 'wrong params'
        });
    }
    const product = new Product(name, code, image, price, stock);
    const productId = await productsManager.save(product);
    return res.status(201).json({
        product: { ...product, id: productId }
    });
});

productsRouter.put('/:id', validateIsAdminMiddleware, async (req, res) => {
    const { name, code, image, price, stock } = req.body;
    const id = req.params.id;
    if(!id || !name || !code || !image || !price || !stock) {
        return res.status(400).json({
            error: -1,
            message: 'wrong params'
        });
    }
    const product = await productsManager.findById(id);
    if(!product) {
        return res.status(404).json({
            error: -1,
            message: 'id not found'
        }); 
    }
    product.setName(name)
        .setCode(code)
        .setImage(image)
        .setPrice(price)
        .setStock(stock);
    await productsManager.save(product);
    return res.status(200).json({
        product
    });
});

productsRouter.delete('/:id', validateIsAdminMiddleware, async (req, res) => {
    const id = req.params.id;
    if(!id) {
        return res.status(400).json({
            error: -1,
            message: 'id needed'
        });
    }
    const deletedProduct = await productsManager.deleteById(id);
    res.json({ deletedProduct });
});

export { productsRouter };