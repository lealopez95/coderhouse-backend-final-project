import express from 'express';
import { validateIsAdminMiddleware } from '../../middlewares/auth.middleware.js';

const productsRouter = express.Router();

productsRouter.get('/',  (req, res) => {
    const productId = req.query.id;
    res.json({algo: 123});
});

productsRouter.post('/', validateIsAdminMiddleware, (req, res) => {
    
});

productsRouter.put('/', validateIsAdminMiddleware, (req, res) => {
    
});

productsRouter.delete('/', validateIsAdminMiddleware, (req, res) => {
    
});

export { productsRouter };