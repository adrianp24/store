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
        this.cart = new Cart(c.id, c.cart.checkoutUrl, c.cart.lines);
        console.log(`This cart ID: ${this.id}`);
        // console.log(`Quantity ${this.cart.lines.edges[0].node.quantity}`)
      })
    })
  }

  onDeleteFromCart(i: number) {
    alert('inside delete from cart');
    this.sub = this.route.params.subscribe(params => {
      this.cartService.deleteLineFromCart(this.id!, this.cart.lines[i].cartLineId).subscribe(result => {
         console.log(`CartLine ID: ${this.cart.lines[i].cartLineId}`);
      });
    }, (err) => {
      console.error(err)
    });
    console.log('finished initializing');
  }
  // this.cart.lines.splice(i)
}




