import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cart } from 'src/app/models/cart';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { GlobalConstants } from 'src/app/services/global-constants.service';
import { MessageService } from 'src/app/services/message.service';

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
  isCartEmpty: boolean = true;

  constructor(
    private cartService: CartService, private route: ActivatedRoute ,private messageService: MessageService
  ) { }

  // FINISH THIS USE PRODUCT AS EXAMPLE
  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = window.sessionStorage.getItem('localCartId');
      this.cartService.getExistingCart(this.id!).subscribe(result => {
        let c: any = result.data;
        this.cart = new Cart(this.id!, c.cart.checkoutUrl, c.cart.lines, c.cart.estimatedCost.totalAmount.amount);
        this.messageService.sendMessage(GlobalConstants.CountUpdate, this.cart.getCartQuantity());
        console.log(`This cart ID: ${this.id}`);
        this.checkCartEmpty();
      })
    })
  }

  onDeleteFromCart(i: number) {
    this.sub = this.route.params.subscribe(params => {
      this.cartService.deleteLineFromCart(this.id!, this.cart.lines[i].cartLineId).subscribe(result => {
        this.messageService.sendMessage(GlobalConstants.CountUpdate, this.cart.getCartQuantity());
        this.checkCartEmpty();
      });
    }, (err) => {
      console.error(err)
    });
  }
  // this.cart.lines.splice(i)
  onQuantityChange(i: number) {
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
        this.messageService.sendMessage(GlobalConstants.CountUpdate, this.cart.getCartQuantity());

        // FIGURE OUT HOW TO PUT GRAPHQL VARIABLES TO WORK POSTMAN WORKS LFGGGGGGGG
      });
    }, (err) => {
      console.error(err)
    });
    console.log('finished initializing');
  }

  checkCartEmpty() {
    if (this.cart.lines.length > 0) {
      this.isCartEmpty = false
    }
  }




}




