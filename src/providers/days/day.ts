import { AngularFireAuth } from 'angularfire2/auth';
import { AuthProvider } from './../auth/auth';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { User } from 'firebase/app';
import { Day } from '../../models/days/day';


@Injectable()
export class DayProvider {

  private basePath: string = '/days';

  days: FirebaseListObservable<Day[]> = null; //  list of objects
  day: FirebaseObjectObservable<Day> = null; //   single object

  constructor(private database: AngularFireDatabase, private afAuth: AngularFireAuth){

  }

  async addDay(day : Day){

    try{
      await this.database.list(`/days/${this.afAuth.auth.currentUser.uid}`).push({
        date: day.date,
        desc: day.desc,
        img : day.img,
        rating: day.rating
      });

      return true;

    }catch(e){
      console.log(e);
      return false;
    }
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
    this.day = this.database.object(dayPath)
    return this.day
  }

   // Update an existing day
   updateDay(key: string, value: any): void {
    this.days.update(key, value)
      .catch(error => this.handleError(error))
   }

   // Deletes a single day
   deleteItem(key: string): void {
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
