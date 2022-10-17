import fs from 'fs';
import fetch from 'node-fetch';
import { DataProviderInterface } from './DataProviderInterface.js';

export class FileManager extends DataProviderInterface { // TODO: this should be implements
    filePath;
    options;

    constructor(filePath, publicUrl) {
        super();
        this.filePath = filePath;
        this.publicUrl = publicUrl;
    }

    fetchFileContent = async () => {
        let response = await fetch(this.publicUrl);
        return response.json();
    }

    writeContent = (content) => {
        fs.writeFileSync(this.filePath, JSON.stringify(content, null, 4));
    }

    getAll = async () => {
        let content;
        try {
            content = await this.fetchFileContent();
        } catch ( err ) {
            content = [];
            this.writeContent(content);
        }
        return content;
    }

    save = async (item) => {
        const content = await this.getAll();
        const lastContentIndex = content.length-1;
        let itemId;
        if(!item.id || item.id === 0) {
            itemId = content[lastContentIndex] ? (content[lastContentIndex].id + 1) : 1;
            const itemToAdd = {
                ...item,
                id: itemId,
            }
            content.push(itemToAdd);
        } else {
            itemId = item.id;
            const updateItemIndex = content.findIndex(existingItem => existingItem.id == itemId);
            content[updateItemIndex] = item;
        }
        this.writeContent(content);
        return itemId;
    }

    findById = async (id) => {
        const content = await this.getAll();
        return content.find( item => item.id == id);
    }

    deleteById = async (id) => {
        const content = await this.getAll();
        const itemIndex = content.findIndex(item => item.id == id);
        if(itemIndex === -1) {
            throw new Error('id not found');
        }
        const deleted = content.splice(itemIndex, 1);
        this.writeContent(content);
        return deleted[0];
    }

}