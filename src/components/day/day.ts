import { DayProvider } from './../../providers/days/day';
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
  image : any;


  constructor(private dayProvider: DayProvider) {
    console.log('Hello DayComponent Component');
    console.log('dayInfo: ' + this.day);
  }

  async ionViewDidLoad(){
    this.image = await this.dayProvider.getImage("day-" + this.day.date.toLocaleDateString());
    console.log("Do something...");   console.log(this.image);
  }

}
