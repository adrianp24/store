import { Product } from "./product";

export class Cart {
    lines: Product[]=[];
    id!: string;
    checkoutUrl!: string;
    // userId?: string;

    constructor(id: string, checkoutUrl: string, lines: any) {
        this.id = id;
        this.checkoutUrl = checkoutUrl;
        // this.userId = userId;
        for (let i = 0; i < lines.edges.length; i++) {
            // alert('In for loop to get existing cart')
            let edge = lines.edges[i];
            let product = new Product(edge.node.merchandise.product);
            product.quantity = edge.node.quantity;
            // product.cartLineId = edge.node.id;
            product.cartLineId = edge.node.id;
            console.log(`cartLine: ${product.cartLineId}`)
            console.log(`Being add to lines ${product.title}`)
            this.lines.push(product);          
          }
    }

}
