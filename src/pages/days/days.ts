import { DayProvider } from './../../providers/days/day';
import { Component, Input } from '@angular/core';
import { Day } from '../../models/days/day';
import { ModalsPage } from '../modals/modals';
import { IonicPage, NavController, Platform, ModalController } from 'ionic-angular';
import { ImageProvider } from '../../providers/image/image';
import { PreloaderProvider } from '../../providers/preloader/preloader';
import { DatabaseProvider } from '../../providers/data/database';
import * as firebase from 'firebase';
import { Http } from '@angular/http';
import 'rxjs/Rx';


/**
 * Generated class for the DayComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@IonicPage()
@Component({
  selector: 'page-days',
  templateUrl: 'days.html'
})
export class DaysPage {

  @Input() day : Day;

  private auth     : any;
  public days      : any;
  private email    : string = 'mail@mail.com';
  private pass     : string = 'password';

  constructor(
    private dayProvider  : DayProvider,
    public navCtrl       : NavController,
    private platform     : Platform,
    private modalCtrl    : ModalController,
    private _IMG         : ImageProvider,
    private _LOADER      : PreloaderProvider,
    private _DB          : DatabaseProvider)
    {
      console.log('Hello DayComponent Component');
      console.log('dayInfo: ' + this.day);
  }

  ionViewDidEnter()
  {
     this._LOADER.displayPreloader();
    //  this.platform.ready()
    //  .then(() =>
    //  {
    //     firebase.auth().signInWithEmailAndPassword(this.email, this.pass)
    //     .then((credentials) =>
    //     {
           this.loadAndParseDays();
    //     })
    //     .catch((err : Error) =>
    //     {
    //        console.log(err.message);
    //     });
    //  });
  }

  /**
   * Loads and parses all days and then hides the spinner
   */
  loadAndParseDays()
  {
     this.days = this._DB.renderDays();
     this._LOADER.hidePreloader();
  }

  /**
   * Opens up the Modal from ModalsPage to add a new Day
   */
  addRecord()
  {
     let modal = this.modalCtrl.create('ModalsPage');
     modal.onDidDismiss((data) =>
     {
        if(data)
        {
           this.loadAndParseDays();
        }
     });
     modal.present();
  }

  //TODO: Image missing in params
  editDay(day)
  {
     let params = { day: day, isEdited: true },
         modal  = this.modalCtrl.create('ModalsPage', params);

     modal.onDidDismiss((data) =>
     {
        if(data)
        {
           this.loadAndParseDays();
        }
     });
     modal.present();
  }


  /**
   * Calls Provider to delete Day entry and then rerenders all days.
   *
   * @param day : Day needed for the $key so Firebase knows what to delete
   */
  deleteDay(day)
  {
    console.log("Gleich ma löschen");
    console.log(day);
     this._DB.deleteDay(day.$key)
     .then((data) =>
     {
        this.loadAndParseDays();
     });
  }

  ionViewDidLoad(){
    // this.image = await this.dayProvider.getImage("day-" + this.day.date.toLocaleDateString());
    // console.log("Do something...");   console.log(this.image);
  }

}



// import { DayProvider } from './../../providers/days/day';
// import { Component } from '@angular/core';
// import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { DAYS_LIST } from '../../mocks/days/days';
// import { Day } from '../../models/days/day';
// import { Observable } from "rxjs/Observable";

// /**
//  * Generated class for the DaysPage page.
//  *
//  * See http://ionicframework.com/docs/components/#navigation for more info
//  * on Ionic pages and navigation.
//  */

// @IonicPage()
// @Component({
//   selector: 'page-days',
//   templateUrl: 'days.html',
// })
// export class DaysPage {

//   //daysList : Day[] = DAYS_LIST;
//   daysList : Observable<Day[]>

//   constructor(public navCtrl: NavController, public navParams: NavParams, private dayProvider: DayProvider) {
//     console.log("days.ts sagt: " + this.daysList);
//   }

//   ionViewWillLoad(){
//     //get days
//     this.getDays();

//   }

//   ionViewDidLoad() {
//     console.log('ionViewDidLoad DaysPage');
//     console.log(this.daysList);
//   }

//   navigateToPage(page){
//       this.navCtrl.push(page);
//   }

//   getDays(){
//     this.daysList = this.dayProvider.getDaysList();
//   }

// }
