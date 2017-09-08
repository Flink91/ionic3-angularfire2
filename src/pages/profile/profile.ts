import { AuthProvider } from './../../providers/auth/auth';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Profile } from '../../models/profile/profile';

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
export class ProfilePage implements OnInit{

  existingProfile = {} as Profile;
  isVerified:boolean = this.auth.getVerfiedStatus(this.existingProfile);

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthProvider, private toast : ToastController) {
  }

  ngOnInit(){
    if(!this.isVerified){
      this.toast.create({
        message: 'Please verify your Email to get the full functionality of PicoJournal. Thanks!',
        duration: 10000,
        showCloseButton : true,
        position: 'top'
      }).present();
    }
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

  sendVerificationMail(){
    if(this.auth){
      if(!this.auth.getVerfiedStatus(this.auth)){
        this.auth.sendVerifyMail();
     }
    }
  }

  signOut(){
    this.auth.signOut();
    this.navCtrl.setRoot('LoginPage');
  }

}
