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
  isCartEmpty: boolean = true;

  constructor(
    private cartService: CartService, private route: ActivatedRoute
  ) { }

  // FINISH THIS USE PRODUCT AS EXAMPLE
  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      // ********** to fix cart I need localcartId to match the cart if one is created or old
      // only works if I manually put
      // on add to cart I should know if cartId existing is too old
      this.id = window.sessionStorage.getItem('localCartId');
      // this.id = "Z2lkOi8vc2hvcGlmeS9DYXJ0LzlkNjg0ZDM4ZGUwYTQ4MDgyZjBhYzg0YjI1ZGNmNjM2";
      this.cartService.getExistingCart(this.id!).subscribe(result => {
        let c: any = result.data;
        this.cart = new Cart(this.id!, c.cart.checkoutUrl, c.cart.lines, c.cart.estimatedCost.totalAmount.amount);
        console.log(`This cart ID: ${this.id}`);
        this.checkCartEmpty();
      })
    })
  }

  onDeleteFromCart(i: number) {
    this.sub = this.route.params.subscribe(params => {
      this.cartService.deleteLineFromCart(this.id!, this.cart.lines[i].cartLineId).subscribe(result => {
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




