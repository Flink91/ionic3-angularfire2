import { DayProvider } from './../../providers/days/day';
import { Component, Input, ViewChild } from '@angular/core';
import { Day } from '../../models/days/day';
import { ModalsPage } from '../modals/modals';
import { IonicPage, NavController, Platform, ModalController, Content } from 'ionic-angular';
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

  @ViewChild(Content) content: Content;

  @Input() day : Day;

  private auth            : any;
  public days             : any;
  public daysOfMonth      : any;
  private email           : string = 'mail@mail.com';
  private pass            : string = 'password';

  public current_date = new Date();
  public date_of_page = new Date();
  public current_month = this.current_date.getMonth();
  public current_year = this.current_date.getFullYear();

  constructor(
    private dayProvider   : DayProvider,
    public navCtrl        : NavController,
    private platform      : Platform,
    private modalCtrl     : ModalController,
    private _IMG          : ImageProvider,
    private _LOADER       : PreloaderProvider,
    private _DB           : DatabaseProvider)
    {
      console.log('Hello DayComponent Component');
      console.log('dayInfo: ' + this.day);
  }

  ionViewDidEnter(){
    console.log("hä" + this.current_date + " " + this.current_month + " " + this.current_year);

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
    let subscription = this._DB.renderDays().subscribe((data : Day[]) => {

        console.log("Subscription successfully got the days from the DB.");
        console.log(data);

        //newest days first
        this.days = data.reverse();

        //get days of current month
        this.daysOfMonth = this.getDaysOfMonth(this.days, this.current_month, this.current_year);

        // success
      }, (errData) => {
        // error
      }, () => {
        // complete
    });


     //this.days = this._DB.renderDays();
     //this.days = this.reverseDays();
     this._LOADER.hidePreloader();
  }

  /**
   * Returns an array of the days which are in the specified month
   * @param days
   * @param month
   */
  getDaysOfMonth(days : Day[], filter_month, filter_year){
    console.log("getDaysOfMonth");
    let new_days_array = [];
    for(let i = 0; i < days.length; i++){
      let year = new Date(days[i].date).getFullYear();
      let month = new Date(days[i].date).getMonth();
      if(month == filter_month && year == filter_year){
        // console.log("Correct Month and year: " + month +"=="+ filter_month + "; " + year + "==" + filter_year);
        new_days_array.push(days[i]);
      }else{
        // console.log("Different Month and year: " + month +"!=="+ filter_month + "; " + year + "!==" + filter_year);
      }
    }
    return new_days_array;
  }

  previousMonth(){
    if(this.current_month != 0){
      this.current_month--;
    this.daysOfMonth = this.getDaysOfMonth(this.days, this.current_month, this.current_year);
    }else{
      this.current_year--;
      this.current_month = 11;
      this.daysOfMonth = this.getDaysOfMonth(this.days, this.current_month, this.current_year);
    }

    this.date_of_page = new Date(this.current_year, this.current_month);
    this.content.scrollToTop();
  }

  nextMonth(){
    if(this.current_month != 11){
      this.current_month++;
    this.daysOfMonth = this.getDaysOfMonth(this.days, this.current_month, this.current_year);
    }else{
      this.current_year++;
      this.current_month = 0;
      this.daysOfMonth = this.getDaysOfMonth(this.days, this.current_month, this.current_year);
    }

    this.date_of_page = new Date(this.current_year, this.current_month);
    this.content.scrollToTop();
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
