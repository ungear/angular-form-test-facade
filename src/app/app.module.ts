import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PizzaOrderFormComponent } from './pizza-order-form/pizza-order-form.component';

@NgModule({
  declarations: [
    AppComponent,
    PizzaOrderFormComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
