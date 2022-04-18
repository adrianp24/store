import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './components/shopify-contact/contact/contact.component';
import { ShopifyProductDetailsComponent } from './components/shopify-product-details/shopify-product-details.component';
import { ShopifyStoreComponent } from './components/shopify-store/shopify-store.component';


const routes: Routes = [
  //
  { path: '', redirectTo: '/store', pathMatch: 'full' },
  { path: 'product/:id', component: ShopifyProductDetailsComponent },
  { path: 'store', component: ShopifyStoreComponent },
  { path: 'contact', component: ContactComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
