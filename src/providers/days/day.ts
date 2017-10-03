import { NewDayUploadResponse } from './../../models/days/new-day-upload-response';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthProvider } from './../auth/auth';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { storage } from 'firebase';
import { User } from 'firebase/app';
import { Day } from '../../models/days/day';


@Injectable()
export class DayProvider {

  private basePath: string = '/days';

  days: FirebaseListObservable<Day[]> = null; //  list of objects
  day: FirebaseObjectObservable<Day> = null; //   single object



  constructor(private database: AngularFireDatabase, private afAuth: AngularFireAuth){

  }

  /**
   * Adds a day to the database. Returns a NewDayUploadResponse asynchronously.
   * @param day to add
   */
  async addDay(day : Day){

    try{
      return <NewDayUploadResponse>
      {
        result: await this.database.list(`/days/${this.afAuth.auth.currentUser.uid}`).push({
          date: day.date,
          desc: day.desc,
          img : day.img,
          rating: day.rating
        })
      }
    }catch(e){
      return <NewDayUploadResponse> {
        error: e
      };
    }
  }


/**
 * Uploads an image into Firebase Storage. Folder Name will be uid Image Name will be Date
 */
  uploadDayImage(image: string, date : Date): any {
    let storageRef = storage().ref();
    let imageName: string  = 'day-' + date;
    let imageRef = storageRef.child(`${this.afAuth.auth.currentUser.uid}/${imageName}.jpg`);

    return imageRef.putString(image, 'data_url')
    .then(function(snapshot) {

      console.log("Upload Image then: " + snapshot);

    });
  }


  getImage(imageId: string): any {
    let storageRef = firebase.storage().ref();
    let imageRef = storageRef.child(`${this.afAuth.auth.currentUser.uid}/${imageId}`);

    return imageRef.getDownloadURL()
    .then(function(url){

    }).catch(function(error){
      console.log("Eror with get Image: " + error);
    });

  }

  getImages() : any{

  }


  getDaysList(query={}): FirebaseListObservable<Day[]> {
    this.days = this.database.list(`/days/${this.afAuth.auth.currentUser.uid}`, {
      query: query
    });
    return this.days
  }
  // Return a single observable day
  getDay(key: string): FirebaseObjectObservable<Day> {
    const dayPath =  `/days/${this.afAuth.auth.currentUser.uid}/${key}`;
    this.day = this.database.object(dayPath);
    return this.day;
  }

   // Update an existing day
   updateDay(key: string, value: any): void {
    this.days.update(key, value)
      .catch(error => this.handleError(error))
   }

   // Deletes a single day
   deleteDay(key: string): void {
      this.days.remove(key)
        .catch(error => this.handleError(error))
   }

  // getDaysRef(): FirebaseObjectObservable<Day>{
  //   return this.database.object(`/days/${this.afAuth.auth.currentUser.uid}`);
  // }

   // Default error handling for all actions
 private handleError(error) {
  console.log(error)
}

}
