import { Injectable } from '@angular/core';
import { Apollo, gql, MutationResult } from 'apollo-angular';
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

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private apollo: Apollo) { }
  
  insertNewCart():  Observable<MutationResult<any>> {
    return this.apollo.mutate({mutation: insertCart});
  }
}
