import { Component } from '@angular/core';

/**
 * Generated class for the AmountInputComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'amount-input',
  templateUrl: 'amount-input.html'
})
export class AmountInputComponent {

  text: string;

  constructor() {
    console.log('Hello AmountInputComponent Component');
    this.text = 'Hello World';
  }

}
