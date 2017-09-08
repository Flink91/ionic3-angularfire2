import { DayProvider } from './../../providers/days/day';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DAYS_LIST } from '../../mocks/days/days';
import { Day } from '../../models/days/day';
import { Observable } from "rxjs/Observable";

/**
 * Generated class for the DaysPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-days',
  templateUrl: 'days.html',
})
export class DaysPage {

  //daysList : Day[] = DAYS_LIST;
  daysList : Observable<Day[]>

  constructor(public navCtrl: NavController, public navParams: NavParams, private dayProvider: DayProvider) {
    console.log("days.ts sagt: " + this.daysList);
  }

  ionViewWillLoad(){
    //get days
    this.getDays();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DaysPage');
    console.log(this.daysList);
  }

  navigateToPage(page){
      this.navCtrl.push(page);
  }

  getDays(){
    this.daysList = this.dayProvider.getDaysList();
  }

}
