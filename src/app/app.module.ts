import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeployFormComponent } from './components/deploy-form/deploy-form.component';

import { ReactiveFormsModule } from '@angular/forms';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { CustomerFeaturesComponent } from './components/customer-features/customer-features.component';
import { VendorFeaturesComponent } from './components/vendor-features/vendor-features.component';
import { VectorFeaturesComponent } from './components/vector-features/vector-features.component';
import { ContractStateComponent } from './components/contract-state/contract-state.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoadFeaturesDirective } from './directives/load-features.directive';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    DeployFormComponent,
    ProductFormComponent,
    CustomerFeaturesComponent,
    VendorFeaturesComponent,
    VectorFeaturesComponent,
    ContractStateComponent,
    NavbarComponent,
    LoadFeaturesDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
