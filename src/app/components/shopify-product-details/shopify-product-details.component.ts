import { Component, forwardRef, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { Variant } from 'src/app/models/variant';
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


  constructor(private route: ActivatedRoute,
    private productService: ProductService) { }

  ngOnInit(): void {

    this.sub = this.route.params.subscribe(params => {
      // wait for user to be logged in before we proceed
      this.id = params['id'];
      this.productService.getProduct(this.id).subscribe(result => {
        let d: any = result.data;
        this.product = new Product(d.product);
        this.variant = this.product.variants[0] ;
        console.log(`This is in the node ${this.variant.price}`)

      });
    }, (err) => {
      console.error(err)
    });
  }

}
