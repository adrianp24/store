import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service'

@Component({
  selector: 'app-shopify-store',
  templateUrl: './shopify-store.component.html',
  styleUrls: ['./shopify-store.component.scss']
})
export class ShopifyStoreComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProductList().subscribe(result => {
      let d: any = result.data;
      let products: any = d.products;
      let edges: any = products.edges;
      for (const edge of edges) {
        this.products.push(new Product(edge.node));
      }
    });

  }
}
