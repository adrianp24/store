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
  product!: Product;
  id!: string;
  sub: any;
  images: Image[] = []
  cart!: Cart;
  localCartId!: any;
  action?: string;
  quantity: number = 1;


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
      });
    }, (err) => {
      console.error(err)
    });
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
  }

  // DO THIS BELOW HOW TO ADD TO EXISTING CARTTTTTT********************
  addToCart() {
    this.sub = this.route.params.subscribe(params => {
      this.cartService.addToExistingCart(this.localCartId, this.variant?.id, this.quantity).subscribe(result => {
      });
    }, (err) => {
      console.error(err)
    }); 
    }


  createCart() {
    this.cartService.insertNewCart().subscribe(result => {
      let c: any = result.data.cartCreate.cart;
      this.localCartId = this.cart.id;
      window.localStorage.setItem('localCartId', this.localCartId);
      this.action = "created a new id.";
      console.log(`localCartID = ${this.localCartId} ... we ${this.action}`)
    })
  }

  


}
