import {Component, Input, OnInit} from '@angular/core';
import {PizzaOrderConfig} from "../pizzaOrderConfig";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {PizzaSize} from "../pizzaSizes";
import {map} from "rxjs";

@Component({
  selector: 'app-pizza-order-form',
  templateUrl: './pizza-order-form.component.html',
  styleUrls: ['./pizza-order-form.component.scss']
})
export class PizzaOrderFormComponent implements OnInit {
  @Input() config!: PizzaOrderConfig;

  orderForm = new FormGroup({
    size: new FormControl<PizzaSize>(PizzaSize.Small, { nonNullable: true }),
    pizza: new FormControl(''),
  });

  pizzaSizes = PizzaSize;
  availablePizzas: string[] = []


  ngOnInit(){
    this.setAvailablePizzas();
    this.orderForm.controls.size.valueChanges.subscribe(_ => {
      this.setAvailablePizzas();
    })
  }

  setAvailablePizzas(){
    const currSize = this.orderForm.get('size')?.value || PizzaSize.Small;
    this.availablePizzas = this.config
      .filter(p => p.availableSizes.includes(currSize))
      .map(x => x.name)
  }

  onOrderFormSubmit(){}
}
