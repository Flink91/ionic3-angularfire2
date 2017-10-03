import { User } from 'firebase/app';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

import { Account } from '../../models/account/account';
import { LoginResponse } from '../../models/login/login-response';
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(private afAuth: AngularFireAuth) {
    console.log('Hello AuthProvider Provider');
  }

  /**
   * Returns true if the account is verified by email
   * @param account
   */
  getVerfiedStatus(account){
    this.afAuth.auth.onAuthStateChanged(function(account){
      if (account.emailVerified) {
        console.log('getVerfiedStatus: Email is verified');
        return true;
      }
      else {
        console.log('getVerfiedStatus: Email is not verified');
        return false;
      }

    });
    return false;
  }

  /**
  * Sends the Email to verify a users email adress
  */
  sendVerifyMail(){

    console.log("Sending Verify Mail...");

    var user = this.afAuth.auth.currentUser;

    user.sendEmailVerification().then(function() {
      console.log("Verification Email sent.");
      // Email sent.
    }).catch(function(error) {
      console.error("Error when sending Verification Email");
      // An error happened.
    });

  }

  /**
   * Returns the state of the authenticated user
   */
  getAuthenticatedUser(){
    return this.afAuth.authState;
  }

  /**
   * Creates a new User
   * @param account consists of email and password
   */
  async createUserWithEmailAndPassword(account){

    try{
      return {

        result: await this.afAuth.auth.createUserWithEmailAndPassword(account.email, account.password)

      }

    }catch(e){

      return {
        error: e
      }

    }
  }

  /**
   * Tries to sign in an account with user an password
   * @param account consists of email and password
   */
  async signInWithEmailAndPassword(account: Account){

    try{
      return <LoginResponse> {
        result: await this.afAuth.auth.signInWithEmailAndPassword(account.email, account.password)
      }

    }catch(e){

      return <LoginResponse> {
        error: e
      };

    }
  }

  /**
   * Signs the user out
   */
  signOut(){
    this.afAuth.auth.signOut();
  }
}
