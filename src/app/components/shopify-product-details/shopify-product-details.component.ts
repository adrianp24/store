import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cart } from 'src/app/models/cart';
import { Image } from 'src/app/models/image';
import { Product } from 'src/app/models/product';
import { Variant } from 'src/app/models/variant';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from '../../services/product.service'

@Component({
  selector: 'app-shopify-product-details',
  templateUrl: './shopify-product-details.component.html',
  styleUrls: ['./shopify-product-details.component.scss']
})
export class ShopifyProductDetailsComponent implements OnInit {
  variant!: Variant;
  model: Product | undefined;
  product!: Product;
  id!: string;
  sub: any;
  images: Image[] = []
  cart!: Cart;
  localCartId!: any;
  action?: string;


  constructor(private route: ActivatedRoute,
    private productService: ProductService, private cartService: CartService) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      // wait for user to be logged in before we proceed
      this.id = params['id'];
      this.productService.getProduct(this.id).subscribe(result => {
        let d: any = result.data;
        this.product = new Product(d.product);
        this.variant = this.product.variants[0];
        this.images = this.product.images;
        console.log(`This is productID: ${this.product.id}`)
        console.log(` images link:${this.images[0].url}`)
        console.log('finished loading products');
        console.log(`Variant ID: ${this.variant.id}`)
      });
    }, (err) => {
      console.error(err)
    });
    console.log('finished initializing');
  }

  onAddToCartClick() {
    this.localCartId = window.localStorage.getItem('localCartId');
    if (this.localCartId === null) {
      this.createCart();
      this.addToCart();
      // this creates new CART ID AND NEW CART ******
    } else {
      this.action = "used existing id.";
      console.log(`localCartID = ${this.localCartId} ... we ${this.action}`);
      this.addToCart();
    }
    // need to create after this if else or during create
  }

  // DO THIS BELOW HOW TO ADD TO EXISTING CARTTTTTT********************
  addToCart() {
    this.sub = this.route.params.subscribe(params => {
      this.cartService.addToExistingCart(this.localCartId, this.variant?.id).subscribe(result => {
        // this.cart.lines = result.data.cartLinesAdd.cart.lines.edges[0].node.merchandise;
        console.log(`in add to cart${result.data.cartLinesAdd.cart.lines.edges[0].node.merchandise.product}`);
      });
    }, (err) => {
      console.error(err)
    }); 
    console.log('finished initializing');
    }


  createCart() {
    this.cartService.insertNewCart().subscribe(result => {
      let c: any = result.data.cartCreate.cart;
      // this.cart = new Cart(c);
      this.localCartId = this.cart.id;
      window.localStorage.setItem('localCartId', this.localCartId);
      this.action = "created a new id.";
      console.log(`localCartID = ${this.localCartId} ... we ${this.action}`)
      // console.log(`Url: ${this.cart.checkoutUrl}`);
      // console.log(`ID: ${this.cart.id}`)
    })
  }

  saveCartIdToLocal() {

  }


  newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }


}
