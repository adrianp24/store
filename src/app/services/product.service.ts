import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo, gql, Query } from 'apollo-angular';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

// setting the graphQL statement as a variable to use in function
const getProductList = gql`
query productList($quantity: Int!){
  products(first: $quantity) {
    edges {
      node {
        id
        description
        title
        totalInventory
        onlineStoreUrl
        descriptionHtml
        publishedAt
        vendor
        productType
         variants(first:10)
        {
          edges
          {
            node
            {
              availableForSale
              id
              compareAtPrice
              price
              title
            }
          }
        }
        priceRange {
            minVariantPrice {
                amount
                currencyCode
            }
            maxVariantPrice {
                amount
                currencyCode
            }
        }
        featuredImage {
          id
          url
          width
          height
          altText
        }
      }
    }
  }
}
`;

// used for product description
const getProduct = gql`
query GetProductsById($id: ID!) {
  product(id: $id) {
    id
    title
    description
    variants(first: 10) {
      edges {
        node {
          price
          availableForSale
          title
        }
      }
    }
    featuredImage {
      url
    }
    images(first: 10) {
      edges {
        node {
          url
          id
          height
          width
          altText
        }
      }
    }
  }
}
`;

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private apollo: Apollo) { }

  /**
   * Get a list of products.
   * @returns list of products
   */

  // observable returning a product list**************
  getProductList(quantity: number = 12): Observable<ApolloQueryResult<Product>> {
    return this.apollo.watchQuery<Product>({
      query: getProductList,
      variables: {
        quantity: 13,
      }
    }).valueChanges;
  }

  // observable returning a product **************
  getProduct(id: string) {
    return this.apollo.watchQuery<Product>({
      query: getProduct,
      variables: {
        id: id,
      }
    }).valueChanges;

  }
}

