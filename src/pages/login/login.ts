import { User } from 'firebase/app';
import { DataProvider } from './../../providers/data/data';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { LoginResponse} from '../../models/login/login-response';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(private data: DataProvider, private navCtrl: NavController, private navParams: NavParams, private toast: ToastController) {
  }

  login(event: LoginResponse){
    console.log(event);
    if(!event.error){

      this.toast.create({
        message: `Welcome to PicoJournal, ${event.result.email}`,
        duration: 3500,
      }).present();

      this.data.getProfile(<User>event.result).subscribe(profile => {
        profile.val() ? this.navCtrl.setRoot('TabsPage') : this.navCtrl.setRoot('TabsPage');
      })

    }else{

      this.toast.create({
        message: event.error.message,
        duration: 3500,
      }).present();

    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
