import { Product } from "./product";

export class Cart {
    // lines: Product[] = [];

    id?: string;
    checkoutUrl?: string;

    constructor(cart:Cart) {
        this.id = cart.id;
        this.checkoutUrl = cart.checkoutUrl;
        // this.lines = cart.lines;
    }

}
