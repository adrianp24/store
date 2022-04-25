import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-shopify-cart',
  templateUrl: './shopify-cart.component.html',
  styleUrls: ['./shopify-cart.component.css']
})
export class ShopifyCartComponent implements OnInit {

  localCartData?: Cart;

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    // this.cartService.insertNewCart().subscribe(result => {
    //   let c: any = result.data;
    //   this.localCartData = new Cart(c);
    // })
  }

  // getCart() {
  //   let localCartData;

  //   // check for local cart ID and get existing cart

  //   localCartData
  // }

}
