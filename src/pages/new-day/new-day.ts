import { DayProvider } from './../../providers/days/day';
import { Component, Input, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Day } from '../../models/days/day';

/**
 * Generated class for the NewDayPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-day',
  templateUrl: 'new-day.html',
})
export class NewDayPage implements OnInit{

  @Input() day: Day;

  constructor(public navCtrl: NavController, public navParams: NavParams, private DayProvider: DayProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewDayPage');
  }

  ngOnInit(){
    if(!this.day){
      this.day = {} as Day;
    }
  }


  newDay(){
    var result = this.DayProvider.addDay(this.day);
    console.log("Day added? " + result);
  }

}
