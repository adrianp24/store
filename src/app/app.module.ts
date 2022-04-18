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



@NgModule({
  declarations: [
    AppComponent,
    ShopifyStoreComponent,
    ShopifyProductComponent,
    ShopifyProductDetailsComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    ApolloModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
