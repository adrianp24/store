import { Injectable } from '@angular/core';
import { Apollo, gql, Mutation, MutationResult } from 'apollo-angular';
import { Observable } from 'rxjs';
import { Cart } from '../models/cart';

const insertCart = gql`
  mutation CreateCart {
    cartCreate {
      cart {
        id
        checkoutUrl
      }
    }
  }
`;

const getCart = gql`
query getCartById($id: ID!) {
  cart(id: $id) {
    id
    lines(first: 100) {
      edges {
        node {
          quantity
          id
          attributes {
            value
          }
          merchandise {
            ... on ProductVariant {
              id
              product {
                id
                description
                title
                totalInventory
                onlineStoreUrl
                descriptionHtml
                publishedAt
                vendor
                productType
                variants(first: 10) {
                  edges {
                    node {
                      availableForSale
                      id
                      compareAtPrice
                      price
                      title
                    }
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
      }
    }
    checkoutUrl
    estimatedCost {
      totalAmount {
        amount
      }
      totalTaxAmount {
        amount
      }
    }
  }
}
`;


// query variables for addtocart
// {"cartId": "Z2lkOi8vc2hvcGlmeS9DYXJ0LzU5MzkxNDA2M2UxYTk3ZTg2ZTc0YzcwMWJlZmNkYWYz",
// "variantId": "gid://shopify/ProductVariant/42719158960357"}
const addToCart = gql`
mutation AddToCart($cartId: ID!, $variantId: ID!) {
  cartLinesAdd(cartId: $cartId, lines: [{quantity: 1, merchandiseId: $variantId}]) {
    cart {
      lines(first: 100) {
        edges {
          node {
            id
            quantity
          merchandise {
            ... on ProductVariant {
              product {
                title
                }
              }
            }
          }
        }
      }
    }
  }
}
`;

const deletCartLine = gql`
mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
  cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
          id
    lines(first: 100) {
      edges {
        node {
          quantity
          id
          attributes {
            value
          }
          merchandise {
            ... on ProductVariant {
              id
              product {
                id
                description
                title
                totalInventory
                onlineStoreUrl
                descriptionHtml
                publishedAt
                vendor
                productType
                variants(first: 10) {
                  edges {
                    node {
                      availableForSale
                      id
                      compareAtPrice
                      price
                      title
                    }
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
      }
    }
    checkoutUrl
    estimatedCost {
      totalAmount {
        amount
      }
      totalTaxAmount {
        amount
      }
    }
      }
    userErrors {
      field
      message
    }
  }
}
`



@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private apollo: Apollo) { }

  // creating a new cart
  insertNewCart(): Observable<MutationResult<any>> {
    return this.apollo.mutate({ mutation: insertCart });
  }

  getExistingCart(id: string) {
    return this.apollo.watchQuery<Cart>({
      query: getCart,
      variables: {
        id: id,
      }
    }).valueChanges;
  };


  //add lines to cart
  addToExistingCart(cartId: string, variantId: string): Observable<MutationResult<any>> {
    return this.apollo.mutate({
      mutation: addToCart,
      variables: {
        cartId: cartId,
        variantId: variantId
      }
    });
  };

  deleteLineFromCart(cartId: string, linesIds: any): Observable<MutationResult<any>> {
    return this.apollo.mutate({
      mutation: deletCartLine,
      variables: {
        cartId: cartId,
        lineIds: linesIds
      }
    });
  };



}
