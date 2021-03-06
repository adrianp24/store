import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { ShopifyProductComponent } from './components/shopify-product/shopify-product.component';
import { ShopifyProductDetailsComponent } from './components/shopify-product-details/shopify-product-details.component';
import { ShopifyStoreComponent } from './components/shopify-store/shopify-store.component';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { ContactComponent } from './components/shopify-contact/contact/contact.component';
import { ShopifyCartComponent } from './components/shopify-cart/shopify-cart/shopify-cart.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatBadgeModule} from '@angular/material/badge';
import {MatIconModule} from '@angular/material/icon';






@NgModule({
  declarations: [
    AppComponent,
    ShopifyStoreComponent,
    ShopifyProductComponent,
    ShopifyProductDetailsComponent,
    ContactComponent,
    ShopifyCartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    ApolloModule,
    FormsModule,
    BrowserAnimationsModule,
    MatBadgeModule,
    MatIconModule
  ],
  schemas:
    [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
