export class Cart {
    id;
    createdTimestamp;
    products;

    constructor(id = 0, products = []) {
        this.id = id;
        this.products = products;
        this.createdTimestamp = Date.now();
    }

    getId = () => {
        return this.id;
    }

    getProducts = () => {
        return this.products;
    }

    getCreatedTiemstamp = () => {
        return this.createdTimestamp;
    }

    setId = (id) => {
        this.id = id;
        return this;
    }

    setProducts = (products) => {
        this.products = products;
        return this;
    }

    setCreatedTiemstamp = (createdTimestamp) => {
        this.createdTimestamp = createdTimestamp;
        return this;
    }

    addProduct = (productToAdd) => {
        const index = this.products.findIndex(product => product.id === productToAdd.id);
        if(index === -1) {
            this.products.push(productToAdd);
        }
    }

    removeProductById = (productIdToRemove) => {
        const index = this.products.findIndex(product => {
            return product.id === productIdToRemove});
        if(index !== -1) {
            return this.products.splice(index, 1);
        }
    }
}