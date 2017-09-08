import { Component, Input } from '@angular/core';
import { Day } from '../../models/days/day';


/**
 * Generated class for the DayComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'day',
  templateUrl: 'day.html'
})
export class DayComponent {

  @Input() day : Day;


  constructor() {
    console.log('Hello DayComponent Component');
    console.log('dayInfo: ' + this.day);
  }

}
