import { BaseEntityProvider } from "./BaseEntityProvider.js";
import { FileManager } from "../data-providers/FileManager.js";
import { fileURLToPath } from 'url';
import path from 'path';
import { Product } from "../entities/Product.js";
const PORT = process.env.PORT || 8080;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class ProductsEntityProvider extends BaseEntityProvider {
    constructor() {
        const productsProvider = new FileManager(
            path.resolve(__dirname, '../../public/files/products.json'),
            `http://localhost:${PORT}/files/products.json`
        );
        super(productsProvider);
    }

    findById = async (id) => {
        const productRaw = await super.findById(id);
        return this.fromRawToProduct(productRaw);
    }

    fromRawToProduct = (raw) => {
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