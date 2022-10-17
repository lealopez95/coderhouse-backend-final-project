
export class Product {

    id;
    createdTimestamp;
    name;
    code;
    image;
    price;
    stock;

    constructor(id = 0, name = '', code = '', image = '', price = 0, stock = 0) {
        this.id = id,
        this.name = name;
        this.createdTimestamp = Date.now();
        this.code = code;
        this.image = image;
        this.price = price;
        this.stock = stock;
    }

    setName = (name) => {
        this.name = name;
        return this;
    }

    setCode = (code) => {
        this.code = code;
        return this;
    }

    setImage = (image) => {
        this.image = image;
        return this;
    }

    setPrice = (price) => {
        this.price = price;
        return this;
    }

    setStock = (stock) => {
        this.stock = stock;
        return this;
    }

    setCreatedTimestamp = (createdTimestamp) => {
        this.createdTimestamp = createdTimestamp;
        return this;
    }

    getId = () => {
        return this.id;
    }

    getName = () => {
        return this.name;
    }

    getCode = () => {
        return this.code;
    }

    getImage = () => {
        return this.image;
    }

    getPrice = () => {
        return this.price;
        
    }

    getStock = () => {
        return this.stock;
    }

    getCreatedTimestamp = () => {
        return this.createdTimestamp;
    }
    
}