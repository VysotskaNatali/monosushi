import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';


import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideStorage,getStorage } from '@angular/fire/storage';


import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { HomeComponent } from './pages/home/home.component';

import { ProductComponent } from './pages/product/product.component';
import { ProductInfoComponent } from './pages/product-info/product-info.component';
import { DiscountComponent } from './pages/discount/discount.component';
import { DiscountInfoComponent } from './pages/discount-info/discount-info.component';
import { DeliveryComponent } from './pages/delivery/delivery.component';
import { AboutComponent } from './pages/about/about.component';
import { OffertaComponent } from './pages/offerta/offerta.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { AdminComponent } from './admin/admin.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminOrderComponent } from './admin/admin-order/admin-order.component';
import { AdminDiscountComponent } from './admin/admin-discount/admin-discount.component';
import { AuthorizationComponent } from './pages/authorization/authorization.component';
import { CabinetComponent } from './pages/cabinet/cabinet.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    
    ProductComponent,
    ProductInfoComponent,
    DeliveryComponent,
    AboutComponent,
    OffertaComponent,
    CheckoutComponent,
    DiscountComponent,
    DiscountInfoComponent,
    
    AdminComponent,
    AdminCategoryComponent,
    AdminProductComponent,
    AdminOrderComponent,
    AdminDiscountComponent,
    AuthorizationComponent,
    CabinetComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
