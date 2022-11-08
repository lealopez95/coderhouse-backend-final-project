import { DAOInterface } from "./DAOInterface.js";
import { FileManager } from "../data-providers/FileManager.js";
import { fileURLToPath } from 'url';
import path from 'path';
import { Product } from "../entities/Product.js";
const PORT = process.env.PORT || 8080;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class ProductsDAO { // @todo should implement DAOInterface interface
    provider;

    constructor() {
        const productsProvider = new FileManager(
            path.resolve(__dirname, '../../public/files/products.json'),
            `http://localhost:${PORT}/files/products.json`
        );
        this.provider = productsProvider;
    }

    getAll = async () => { 
        return this.provider.getAll();
    }

    findById = async (id) => {
        const productRaw = await this.provider.findById(id);
        if(!productRaw) {
            return;
        }
        return ProductsEntityProvider.fromRawToProduct(productRaw);
    }

    save = async (item) => {
        return this.provider.save(item);
     }

    deleteById = async (id) => {
        return this.provider.deleteById(id);
     }

    static fromRawToProduct = (raw) => {
        const product = new Product(raw.id || 0);
        product.setName(raw.name)
            .setCode(raw.code)
            .setImage(raw.image)
            .setPrice(raw.price)
            .setStock(raw.stock)
            .setCreatedTimestamp(raw.createdTimestamp);
        return product;
    }
}