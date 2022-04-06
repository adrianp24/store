import { Currency } from "./currency";
import { Image } from "./image";

export class Product {
    id!: number;
    description!: string;
    title!: string;
    availableForSale!: string;
    totalInventory!: string;
    onlineStoreUrl!: string;
    featuredImage!: Image;
    price!: Currency;

    constructor(product?: any) {
        this.id = product.id;
        this.description = product.description;
        this.title = product.title;
        this.availableForSale = product.availableForSale;
        this.totalInventory = product.totalInventory;
        this.onlineStoreUrl = product.onlineStoreUrl;
        this.featuredImage = product.featuredImage;
        this.price = product.price;
    }
}
