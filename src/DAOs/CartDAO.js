import { DAOInterface } from "./DAOInterface.js";
import { FileManager } from "../data-providers/FileManager.js";
import { fileURLToPath } from 'url';
import path from 'path';
import { Cart } from "../entities/Cart.js";
import { ProductsDAO } from "./ProductsDAO.js";

const productsManager = new ProductsDAO(); 
const PORT = process.env.PORT || 8080;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class CartDAO { // @todo should implement DAOInterface interface
    provider;

    constructor() {
        const cartProvider = new FileManager(
            path.resolve(__dirname, '../../public/files/cart.json'),
            `http://localhost:${PORT}/files/cart.json`
        );
        this.provider = cartProvider;
    }

    getAll = async () => {
        return this.provider.getAll();
    }

    findById = async (id) => {
        const cartRaw = await this.provider.findById(id);
        if(!cartRaw) {
            return;
        }
        return CartDAO.fromRawToCart(cartRaw);
    }

    save = async (item) => {
        return this.provider.save(item);
    }

    deleteById = async (id) => {
        return this.provider.deleteById(id);
    }

    static fromRawToCart = (raw) => {
        const cart = new Cart(raw.id || 0);
        const products = [];
        for(const product of raw.products) {
            products.push(
                ProductsDAO.fromRawToProduct(product)
            );
        }
        cart.setProducts(products)
            .setCreatedTiemstamp(raw.createdTimestamp);
        return cart;
    }

    addProductsByIds = async (cart, productIds) => {
        const productsAdded = [];
        const idsNotFound = [];
        for (const productId of productIds) {
            const product = await productsManager.findById(productId)
            if(product) {
                cart.addProduct(product);
                productsAdded.push(product);
            } else {
                idsNotFound.push(productId);
            }
        }
        await this.save(cart);
        return {
            productsAdded,
            idsNotFound,
        }
    }

    deleteProductById = async (cart, productId) => {
        const removedProduct = cart.removeProductById(productId);
        await this.save(cart);
        return removedProduct;
    }
}