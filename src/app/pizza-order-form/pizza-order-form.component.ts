import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PizzaOrderConfig} from "../typing/pizzaOrderConfig";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PizzaSize} from "../enums/pizzaSizes";
import { PizzaOrder } from '../typing/pizzaOrder';
import {DeliveryTypes} from "../enums/deliveryTypes";

@Component({
  selector: 'app-pizza-order-form',
  templateUrl: './pizza-order-form.component.html',
  styleUrls: ['./pizza-order-form.component.scss']
})
export class PizzaOrderFormComponent implements OnInit {
  @Input() config!: PizzaOrderConfig;
  @Output() submitA = new EventEmitter<PizzaOrder>();
  orderForm = new FormGroup({
    size: new FormControl<PizzaSize>(PizzaSize.Small, {
      nonNullable: true,
      validators: [ Validators.required,]
     }),
    pizza: new FormControl('', {
      validators: [ Validators.required,]
    }),
    delivery: new FormControl<DeliveryTypes>(DeliveryTypes.FromPizzeria, {
      nonNullable: true,
      validators: [ Validators.required,]
    }),
    deliveryAddress: new FormControl(''),
  });

  pizzaSizes = PizzaSize;
  deliveryTypes = DeliveryTypes;
  availablePizzas: string[] = []


  ngOnInit(){
    this.setAvailablePizzas();
    this.orderForm.controls.size.valueChanges.subscribe(_ => {
      this.setAvailablePizzas();
      this.orderForm.controls.pizza.reset('');
    })
  }

  setAvailablePizzas(){
    const currSize = this.orderForm.get('size')?.value || PizzaSize.Small;
    this.availablePizzas = this.config
      .filter(p => p.availableSizes.includes(currSize))
      .map(x => x.name)
  }

  onOrderFormSubmit(){
    if(!this.orderForm.valid) return;

    // in a real app we would use a custom validator for delivery address
    // but in this example let's just use a straightforward check for simplicity
    if(this.isDeliveryFromPizzeria && this.orderForm.get('deliveryAddress')?.value?.length === 0) return;

    const order: PizzaOrder = {
      size: this.orderForm.get('size')!.value,
      pizza: this.orderForm.get('pizza')!.value as string,
      delivery: this.orderForm.get('delivery')!.value,
      deliveryAddress: this.orderForm.get('delivery')!.value === this.deliveryTypes.HomeDelivery
        ? this.orderForm.get('deliveryAddress')!.value as string
        : undefined
    };

    this.submitA.next(order);
  }

  get isDeliveryFromPizzeria(): boolean{
    return this.orderForm.get('delivery')?.value === this.deliveryTypes.HomeDelivery
  }
}
