import { Component, Input, OnInit } from '@angular/core';
import { Variant } from 'src/app/models/variant';
import { Product } from '../../models/product';

@Component({
  selector: 'app-shopify-product',
  templateUrl: './shopify-product.component.html',
  styleUrls: ['./shopify-product.component.scss']
})
export class ShopifyProductComponent implements OnInit {

  @Input()
  product!: Product;

  constructor() { }

  ngOnInit(): void {
  }

}
