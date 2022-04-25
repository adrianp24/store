import { Component, forwardRef, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
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
  variant!: Variant | undefined;
  model: Product | undefined;
  product!: Product;
  id!: string;
  sub: any;
  images: Image[] = []
  localCartData!: Cart;


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
        console.log(`This is in the node ${this.variant.price}`)
        console.log(` images link:${this.images[0].url}`)
        console.log('finished loading products');
      });
    }, (err) => {
      console.error(err)
    });
    console.log('finished initializing');
  }

  onAddToCartClick() {
    // if no cart exist createCart()
    // if cart exist add to cart with id to api
  }

  createCart() {
    this.cartService.insertNewCart().subscribe(result => {
      let c: any = result.data.cartCreate.cart;
      this.localCartData = new Cart(c);
      console.log(`${this.localCartData.checkoutUrl}`)
    })
  }

  addToCart () {

  }


}
