import { Image } from "./image";
import { Variant } from "./variant";

export class Product {
    id!: number;
    description!: string;
    title!: any;
    availableForSale!: string;
    onlineStoreUrl!: string;
    featuredImage!: Image;
    variants: Variant[] = [];
    images: Image[] = [];
    price!: number;
    quantity?: number;
    cartLineId: string;

    constructor(product: any) {
        this.id = product.id;
        this.description = product.description;
        this.title = product.title;
        this.availableForSale = product.availableForSale;
        this.onlineStoreUrl = product.onlineStoreUrl;
        this.featuredImage = product.featuredImage;
        this.quantity = product.quantity;
        this.cartLineId = product.cartLineId;

        if (product.images != undefined) {
            for (const image of product?.images?.edges) {
                this.images.push(new Image(image.node))
            }
        }

        if (product.variants != undefined) {
            for (const edge of product.variants.edges) {
                let variant = new Variant(edge.node);
                this.variants.push(variant);
            }
        }

        if (product.variants != undefined) {
            for (const edge of product.variants.edges) {
                this.price = edge.node.price
                return
            }
        }
    }
}
