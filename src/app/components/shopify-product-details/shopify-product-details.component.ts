import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from '../../services/product.service'

@Component({
  selector: 'app-shopify-product-details',
  templateUrl: './shopify-product-details.component.html',
  styleUrls: ['./shopify-product-details.component.scss']
})
export class ShopifyProductDetailsComponent implements OnInit {
  model: Product | undefined;
  product: any;
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
        this.product = d.product;
      });
    }, (err) => {
      console.error(err)
    });
  }

}
