import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { ToastController } from 'ionic-angular';
/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  constructor(private toast: ToastController) {
  }

  register(event){
    if(!event.error){
      this.toast.create({
        message: `Account created: ${event.result.email}`,
        duration: 3500
      }).present();
    }else{
      this.toast.create({
        message: event.error.message,
        duration: 3500
      }).present();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
