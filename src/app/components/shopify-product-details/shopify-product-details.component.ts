import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cart } from 'src/app/models/cart';
import { Image } from 'src/app/models/image';
import { Product } from 'src/app/models/product';
import { Variant } from 'src/app/models/variant';
import { CartService } from 'src/app/services/cart.service';
import { GlobalConstants } from 'src/app/services/global-constants.service';
import { MessageService } from 'src/app/services/message.service';
import { ProductService } from '../../services/product.service'

@Component({
  selector: 'app-shopify-product-details',
  templateUrl: './shopify-product-details.component.html',
  styleUrls: ['./shopify-product-details.component.scss']
})
export class ShopifyProductDetailsComponent implements OnInit {
  variant!: Variant;
  product!: Product;
  id!: string;
  sub: any;
  images: Image[] = []
  localCartId!: any;
  action?: string;
  quantity: number = 1;


  constructor(private route: ActivatedRoute, private messageService: MessageService,
    private productService: ProductService, private cartService: CartService) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      // wait for user to be logged in before we proceed
      this.id = params['id'];
      this.productService.getProduct(this.id).subscribe(result => {
        let d: any = result.data;
        this.product = new Product(d.product);
        console.log(`Title ${this.product.title}`)
        this.variant = this.product.variants[0];
        this.images = this.product.images;
      });
    }, (err) => {
      console.error(err)
    });
  }

  onAddToCartClick() {
    this.localCartId = window.sessionStorage.getItem('localCartId');
    if (this.localCartId === null) {
      this.createCartAndAddLine();
      // this.addToCart();
      // this creates new CART ID AND NEW CART ******
    } else {
      this.action = "used existing id.";
      console.log(`localCartID = ${this.localCartId} ... we ${this.action}`);
      this.addToCart();
    }
  }

  // DO THIS BELOW HOW TO ADD TO EXISTING CARTTTTTT********************
  addToCart() {
    this.sub = this.route.params.subscribe(params => {
      this.cartService.addToExistingCart(this.localCartId, this.variant?.id, this.quantity).subscribe(result => {
        // // count query under this
        // this.cartService.getCartItemCount(this.id).subscribe(result => {
        //   let line = result.data.lines.edges
          
        //   this.messageService.sendMessage(GlobalConstants.CountUpdate, result);
        // })
        this.cartService.getExistingCart(this.localCartId).subscribe(result => {
          let c: any = result.data;
          let cart = new Cart(this.localCartId, c.cart.checkoutUrl, c.cart.lines, c.cart.estimatedCost.totalAmount.amount);
          console.log(`This cart ID: ${this.id}`);
          this.messageService.sendMessage(GlobalConstants.CountUpdate, cart.getCartQuantity());
          
        })
      });
    }, (err) => {
      console.error(err)
    });
  }


  // createCart() {
  //   this.cartService.insertNewCart().subscribe(result => {
  //     let c: any = result.data.cartCreate.cart;
  //     // should work with code under shouldnt have to manualy input************** FIX
  //     // this.localCartId = "Z2lkOi8vc2hvcGlmeS9DYXJ0LzlkNjg0ZDM4ZGUwYTQ4MDgyZjBhYzg0YjI1ZGNmNjM2"
  //     ///////by changing to session storage and c.id mightve fixed bug
  //     this.localCartId = c.id;
  //     window.sessionStorage.setItem('localCartId', this.localCartId);
  //     this.action = "created a new id.";
  //     console.log(`localCartID = ${this.localCartId} ... we ${this.action}`)
  //   })
  // }

  // creates while adding
  createCartAndAddLine() {
    this.cartService.createCartAndAddLine(this.variant?.id, this.quantity).subscribe(result => {
      let c: any = result.data.cartCreate.cart;
      this.localCartId = c.id;
      window.sessionStorage.setItem('localCartId', this.localCartId);
      this.action = "CREATED NEW CART.";
      console.log(`localCartID = ${this.localCartId} ... we ${this.action}`)
      console.log(`Lines Added = ${this.variant?.id} Quantity ${this.quantity}`)
    })
  }




}
