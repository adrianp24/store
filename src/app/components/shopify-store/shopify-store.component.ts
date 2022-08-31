import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Cart } from 'src/app/models/cart';
import { Variant } from 'src/app/models/variant';
import { GlobalConstants } from 'src/app/services/global-constants.service';
import { MessageService } from 'src/app/services/message.service';
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
    private productService: ProductService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getFirstProductList();

  }

  getFirstProductList() {
    this.products = [];
    this.productService.getProductList().subscribe(result => {
      let d: any = result.data;
      let products: any = d.products;
      let edges: any = products.edges;
      for (const edge of edges) {
        let product = new Product(edge.node);
        this.products.push(product);
      }
    });
  }

  getSecondProductList() {
    this.products = [];
    
    for (let i = 0; i < this.products.length; i++) {
      this.products[i].variants= [];
    }
    this.productService.getSecondProductList().subscribe(result => {
      let d: any = result.data;
      let products: any = d.products;
      let edges: any = products.edges;
      for (const edge of edges) {
        let product = new Product(edge.node);
        this.products.push(product);
      }
    });
  }


}
