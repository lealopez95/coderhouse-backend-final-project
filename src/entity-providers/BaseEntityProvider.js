export class BaseEntityProvider {
    provider; // DataProviderInterface

    constructor(provider) {
        this.provider = provider;
    }

    getAll = async () => {
        return this.provider.getAll();
    }

    save = async (item) => {
        return this.provider.save(item);
    }

    findById = async (id) => {
        return this.provider.findById(id);
    }

    deleteById = async (id) => {
        return this.provider.deleteById(id);
    }
}