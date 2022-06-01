import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cart } from 'src/app/models/cart';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-shopify-cart',
  templateUrl: './shopify-cart.component.html',
  styleUrls: ['./shopify-cart.component.css']
})
export class ShopifyCartComponent implements OnInit {
  sub: any;
  cart!: Cart;
  id!: string | null;
  variant: any;

  constructor(
    private cartService: CartService, private route: ActivatedRoute
  ) { }

  // FINISH THIS USE PRODUCT AS EXAMPLE
  ngOnInit(): void {
    this.id = window.localStorage.getItem('localCartId');
    this.sub = this.route.params.subscribe(params => {
      // this.id = params['id'];
      this.cartService.getExistingCart(this.id!).subscribe(result => {
        let c: any = result.data;
        let totalAmount = c.cart.estimatedCost.totalAmount.amount
        this.cart = new Cart(c.id, c.cart.checkoutUrl, c.cart.lines, totalAmount);
        console.log(`This cart ID: ${this.id}`);
        // console.log(`Quantity ${this.cart.lines.edges[0].node.quantity}`)
      })
    })
  }

  onDeleteFromCart(i: number) {
    alert('inside delete from cart');
    this.sub = this.route.params.subscribe(params => {
      this.cartService.deleteLineFromCart(this.id!, this.cart.lines[i].cartLineId).subscribe(result => {
        // if(this.cart.lines[i].cartLineId === undefined)
        //  console.log(`CartLine Successfuly deleted`);
      });
    }, (err) => {
      console.error(err)
    });
    console.log('finished initializing');
  }
  // this.cart.lines.splice(i)
  onQuantityChange(i:number) {
    this.sub = this.route.params.subscribe(params => {
      let lines = {
        attributes: [
          {
            key: "quantity",
            value: `"${this.cart.lines[i].quantity}"`
          }
        ],
        id: this.cart.lines[i].cartLineId,
        merchandiseId: this.cart.lines[i].variants[0].id,
        quantity: this.cart.lines[i].quantity
      };
      this.cartService.updateCartQuantity(this.id!, lines).subscribe(result => {
        // FIGURE OUT HOW TO PUT GRAPHQL VARIABLES TO WORK POSTMAN WORKS LFGGGGGGGG
      });
    }, (err) => {
      console.error(err)
    });
    console.log('finished initializing');
  }
}




