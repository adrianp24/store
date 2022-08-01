import { Product } from "./product";

export class Cart {
    lines: Product[] = [];
    id!: string;
    checkoutUrl!: string;
    totalAmount?: number;
    totalTaxAmount?: number;
    // userId?: string;

    constructor(id: string, checkoutUrl: string, lines: any, totalAmount?: any, totalTaxAmount?: number) {
        this.id = id;
        this.checkoutUrl = checkoutUrl;

        // this.totalTaxAmount = totalTaxAmount;

        this.totalAmount = totalAmount;
        // this.userId = userId;
        for (let i = 0; i < lines.edges.length; i++) {
            let edge = lines.edges[i];
            let product = new Product(edge.node.merchandise.product);
            product.quantity = edge.node.quantity;
            product.cartLineId = edge.node.id;
            this.lines.push(product);
        }
    }

    public getCartQuantity(): number {
        let q = 0;
        for (const line of this.lines) {
            if (line.quantity) {
                q = q + line.quantity;
            }
        }
        return q;
    }
}
