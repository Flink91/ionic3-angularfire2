import { Profile } from './../../models/profile/profile';
import { User } from 'firebase/app';
import { AuthProvider } from './../../providers/auth/auth';
import { DataProvider } from './../../providers/data/data';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoadingController, Loading } from 'ionic-angular';

/**
 * Generated class for the ProfileViewComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'profile-view',
  templateUrl: 'profile-view.html'
})
export class ProfileViewComponent implements OnInit{

  private authUser: User;
  public userProfile : Profile;
  private loader: Loading;

  @Output() existingProfile: EventEmitter<Profile>;

  constructor(private loading: LoadingController, private data : DataProvider, private auth: AuthProvider) {
    console.log('Hello ProfileViewComponent Component');

    this.existingProfile = new EventEmitter<Profile>();

    this.loader = this.loading.create({
      content: 'Loading...'
    });
  }

  ngOnInit(): void {
    this.loader.present();

    //this uses mergemap from rxjs, look at dataprovider for further info
    this.data.getAuthenticatedUserProfile().subscribe( profile => {
      this.userProfile = profile;
      this.existingProfile.emit(this.userProfile);
      this.loader.dismiss();
    });
  }


}
