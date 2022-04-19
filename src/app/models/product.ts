import { Currency } from "./currency";
import { Image } from "./image";
import { Variant } from "./variant";

export class Product {
    id!: number;
    description!: string;
    title!: string;
    availableForSale!: string;
    onlineStoreUrl!: string;
    featuredImage!: Image;
    variants: Variant[] = [];
    

    constructor(product?: any) {
        this.id = product.id;
        this.description = product.description;
        this.title = product.title;
        this.availableForSale = product.availableForSale;
        this.onlineStoreUrl = product.onlineStoreUrl;
        this.featuredImage = product.featuredImage;
        for (const edge of product.variants.edges) {
            let variant = new Variant(edge.node);
            this.variants.push(variant);
        }
    }
}
