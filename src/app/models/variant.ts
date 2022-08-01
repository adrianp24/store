import { Image } from "./image";

export class Variant {
    id!: string;
    price!: number;
    availableForSale!: boolean;
    title!: string;
    compareAtPrice: number;

    constructor(variant?: any) {
        this.id = variant?.id;
        this.price = variant?.price;
        this.title = variant?.title;
        this.availableForSale = variant?.availableForSale;
        this.compareAtPrice = variant?.compareAtPrice;
    }
}
