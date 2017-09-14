import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthProvider } from './../auth/auth';


@Injectable()
export class DatabaseProvider {

   constructor(public http: Http, private afAuth: AngularFireAuth)
   {
   }



   renderDays() : Observable<any>
   {

      return new Observable(observer =>
      {
         let days : any = [];
         firebase.database().ref(`/days/${this.afAuth.auth.currentUser.uid}`).orderByKey().once('value', (items : any) =>
         {
            items.forEach((item) =>
            {
               days.push({
                $key  : item.key,
	              date  : item.val().date,
                desc  : item.val().desc,
                img   : item.val().img,
                rating: item.val().rating

	           });
            });

            observer.next(days);
            observer.complete();
         },
         (error) =>
         {
            console.log("Observer error: ", error);
            console.dir(error);
            observer.error(error)
         });

      });
   }



   deleteDay($key) : Promise<any>
   {
     console.log("id to delete: " + $key);
      return new Promise((resolve) =>
      {
         let ref = firebase.database().ref(`/days/${this.afAuth.auth.currentUser.uid}`).child($key);
         ref.remove();
         resolve(true);
      });
   }



   addToDatabase(dayObj) : Promise<any>
   {
      return new Promise((resolve) =>
      {
         let addRef = firebase.database().ref(`/days/${this.afAuth.auth.currentUser.uid}`);
         addRef.push(dayObj);
         resolve(true);
      });
   }



   updateDatabase(id, daysObj) : Promise<any>
   {
      return new Promise((resolve) =>
      {
         var updateRef = firebase.database().ref(`/days/${this.afAuth.auth.currentUser.uid}`).child(id);
	      updateRef.update(daysObj);
         resolve(true);
      });
   }



   uploadImage(imageString, date:Date) : Promise<any>
   {
      let image       : string  = 'day-' + date + '.jpg',
          storageRef  : any,
          parseUpload : any;

      return new Promise((resolve, reject) =>
      {
         storageRef       = firebase.storage().ref('days/' + image);
         parseUpload      = storageRef.putString(imageString, 'data_url');

         parseUpload.on('state_changed', (_snapshot) =>
         {
            // We could log the progress here IF necessary
            // console.log('snapshot progess ' + _snapshot);
         },
         (_err) =>
         {
            reject(_err);
         },
         (success) =>
         {
            resolve(parseUpload.snapshot);
         });
      });
   }


}
