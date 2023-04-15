import { PizzaSize } from "../enums/pizzaSizes";
import {DeliveryTypes} from "../enums/deliveryTypes";

export interface PizzaOrder {
  size: PizzaSize,
  pizza: string,
  delivery: DeliveryTypes,
}
