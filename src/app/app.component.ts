import { Component } from '@angular/core';
import {PizzaSize} from "./enums/pizzaSizes";
import {PizzaOrderConfig} from "./typing/pizzaOrderConfig";
import { PizzaOrder } from './typing/pizzaOrder';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  orderFormConfig: PizzaOrderConfig = [
    { name: 'Margarita', availableSizes: [PizzaSize.Small, PizzaSize.Medium] },
    { name: 'Pesto', availableSizes: [PizzaSize.Medium] },
    { name: 'Pepperoni', availableSizes: [PizzaSize.Large] }
  ]

  onPizzaOrderSubmit(order: PizzaOrder){
    console.log(order)
  }
}
