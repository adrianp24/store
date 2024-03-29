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

const createCartAndAddLine = gql`
mutation createCartAndAddLine ( $variantId: ID!, $quantity: Int) {
  cartCreate(
    input: {
      lines: [
        {
          quantity: $quantity
          merchandiseId:$variantId
        }
      ]
      attributes: { key: "cart_attribute", value: "This is a cart attribute" }
    }
  ) {
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

const addToCart = gql`
mutation AddToCart($cartId: ID!, $variantId: ID!, $quantity: Int) {
  cartLinesAdd(cartId: $cartId, lines: [{quantity: $quantity, merchandiseId: $variantId}]) {
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

const updateCartQuantity = gql`
mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
  cartLinesUpdate(cartId: $cartId, lines: $lines) {
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
  addToExistingCart(cartId: string, variantId: string, quantity: any): Observable<MutationResult<any>> {
    return this.apollo.mutate({
      mutation: addToCart,
      variables: {
        cartId: cartId,
        variantId: variantId,
        quantity: quantity
      }
    });
  };

  createCartAndAddLine(variantId: string, quantity: any): Observable<MutationResult<any>> {
    return this.apollo.mutate({
      mutation: createCartAndAddLine,
      variables: {
        variantId: variantId,
        quantity: quantity
      }
    })
  }

  deleteLineFromCart(cartId: string, linesIds: any): Observable<MutationResult<any>> {
    return this.apollo.mutate({
      mutation: deletCartLine,
      variables: {
        cartId: cartId,
        lineIds: linesIds
      }
    });
  };

  updateCartQuantity(cartId: string, lines: any): Observable<MutationResult<any>> {
    return this.apollo.mutate({
      mutation: updateCartQuantity,
      variables: {
        cartId: cartId,
        lines: lines
      }
    })
  }

}
