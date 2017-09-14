import { NewDayUploadResponse } from './../../models/days/new-day-upload-response';
import { DayProvider } from './../../providers/days/day';
import { Component, Input, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
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
  base64Image : string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private DayProvider: DayProvider, private toast: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewDayPage');
    this.day.date = new Date();
  }

  ngOnInit(){
    if(!this.day){
      this.day = {} as Day;
    }
  }

  newDayUploadStatus(event : NewDayUploadResponse){
    console.log("Event Day Upload incoming: ");
    console.log(event);

    if(!event.error){

            this.toast.create({
              message: `New Day added! : ${event.result}`,
              duration: 3500,
            }).present();

            this.navCtrl.pop();

          }else{

            this.toast.create({
              message: event.error.message,
              duration: 3500,
              position: 'top'
            }).present();

          }
    // event ? this.navCtrl.pop() : console.log("Not authenticated or saved");
  }

}
