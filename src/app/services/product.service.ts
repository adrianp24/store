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
        availableForSale
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
const getProduct = gql`
query GetProductsById($id: ID!) {
  product(id: $id) {
    availableForSale
    compareAtPriceRange {
        maxVariantPrice {
            amount
            currencyCode
        }
        minVariantPrice {
            amount
            currencyCode
        }
    }
    createdAt
    description
    descriptionHtml
    featuredImage {
        id
        altText
        height
        url
        width
    }
    handle
    id
    onlineStoreUrl
    options {
        id
        name
        values 
    }
    priceRange {
        maxVariantPrice {
            amount
            currencyCode
        }
    }
    productType
    publishedAt
    requiresSellingPlan
    seo {
        description
        title
    }
    tags
    title
    totalInventory
    updatedAt
    vendor
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
