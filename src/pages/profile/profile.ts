import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Profile} from '../../models/profile/profile';

/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  existingProfile = {} as Profile;

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');

  }

  getExistingProfile(profile: Profile){
    this.existingProfile = profile;
  }

  navigateToPage(page){
    if(page == 'EditProfilePage'){
      this.navCtrl.push('EditProfilePage', {existingProfile: this.existingProfile});
    }else{
      this.navCtrl.push(page);
    }

  }

  signOut(){
    this.auth.signOut();
    this.navCtrl.setRoot('LoginPage');
  }

}
