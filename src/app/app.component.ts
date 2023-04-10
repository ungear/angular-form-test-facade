import { Component } from '@angular/core';
import {PizzaSize} from "./pizzaSizes";
import {PizzaOrderConfig} from "./pizzaOrderConfig";

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
}
