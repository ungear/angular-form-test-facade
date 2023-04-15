import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PizzaOrderConfig} from "../typing/pizzaOrderConfig";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PizzaSize} from "../pizzaSizes";
import {map} from "rxjs";
import { PizzaOrder } from '../typing/pizzaOrder';

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
  });

  pizzaSizes = PizzaSize;
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
    const order: PizzaOrder = {
      size: this.orderForm.get('size')!.value,
      pizza: this.orderForm.get('pizza')!.value as string,
    };
    this.submitA.next(order);
  }
}
