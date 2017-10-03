import { AuthProvider } from './../auth/auth';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { User } from 'firebase/app';
import { Profile } from '../../models/profile/profile';
import "rxjs/add/operator/take";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";

/*
  Generated class for the DataProvider provider.
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class DataProvider {

  profileObject: FirebaseObjectObservable<Profile>;

  constructor(private database: AngularFireDatabase, private authProvider: AuthProvider) {
    console.log('Hello DataProvider Provider');
  }

  /**
   * Returns an Observable of type User from the DB of the authenticated user
   */
  getAuthenticatedUserProfile(){
    return this.authProvider.getAuthenticatedUser()
      .map(user => user.uid)
      .mergeMap(authId => this.database.object(`profiles/${authId}`))
      .take(1);
  }

  /**
   * Gets a profile!
   * @param user the user to get the profile of
   */
  getProfile(user: User){
    this.profileObject = this.database.object(`/profiles/${user.uid}`, {preserveSnapshot: true});

    return this.profileObject.take(1);
  }

  /**
   * saves a profile to the database
   * @param user the user to save the profile to
   * @param profile the profile object to save
   */
  async saveProfile(user: User, profile: Profile){

    this.profileObject = this.database.object(`/profiles/${user.uid}`);

    try{
      await this.profileObject.set(profile);
      return true;

    }catch(e){
      console.error(e);
      return false;
    }
  }

}
