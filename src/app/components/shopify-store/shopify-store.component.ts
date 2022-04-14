import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Variant } from 'src/app/models/variant';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service'

@Component({
  selector: 'app-shopify-store',
  templateUrl: './shopify-store.component.html',
  styleUrls: ['./shopify-store.component.scss']
})
export class ShopifyStoreComponent implements OnInit {
  products: Product[] = [];
  // variants: Variant[] = [];

  constructor(
    private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProductList().subscribe(result => {
      let d: any = result.data;
      let products: any = d.products;
      let edges: any = products.edges;
      for (const edge of edges) {
        let product = new Product(edge.node);
        this.products.push(product);
        // let variantEdges = product
        // for (const edge of ede) {
        //   product.variant
        // }
      }

      ////////////
      // let variantNodee = d.variants.edge;

      // for (let i = 0; i < variantNodee[i].node; i++) {
      // this.variants.push(new Variant())
        
      // }
      // let variantNode = this.product.variants.edges
      // this.variant = variantNode ;
    });

  }
}
