import { EntityProviderInterface } from "./EntityProviderInterface.js";
import { FileManager } from "../data-providers/FileManager.js";
import { fileURLToPath } from 'url';
import path from 'path';
import { Cart } from "../entities/Cart.js";
import { ProductsEntityProvider } from "./ProductsService.js";

const productsManager = new ProductsEntityProvider(); 
const PORT = process.env.PORT || 8080;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class CartEntityProvider { // @todo should implement EntityProviderInterface interface
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
        return CartEntityProvider.fromRawToCart(cartRaw);
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
                ProductsEntityProvider.fromRawToProduct(product)
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