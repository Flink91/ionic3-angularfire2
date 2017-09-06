import { Component, OnDestroy, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Profile } from '../../models/profile/profile';
import { Subscription } from 'rxjs/Subscription';
import { DataProvider } from '../../providers/data/data';
import { User } from 'firebase/app';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the EditProfileFormComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'edit-profile-form',
  templateUrl: 'edit-profile-form.html'
})
export class EditProfileFormComponent implements OnInit, OnDestroy{

  private authenticatedUser$: Subscription;
  private authenticatedUser: User;

  @Output() saveProfileResult: EventEmitter<Boolean>;

  @Input() profile: Profile;

  constructor(private data: DataProvider, private auth: AuthProvider) {

    this.saveProfileResult = new EventEmitter<Boolean>();

    this.authenticatedUser$ = this.auth.getAuthenticatedUser().subscribe((user: User) => {
      this. authenticatedUser = user;
    })

  }

  async saveProfile(){
    if(this.authenticatedUser){
      const result = await this.data.saveProfile(this. authenticatedUser, this.profile);
      this.saveProfileResult.emit(result);
    }
  }

  ngOnInit(){
    if(!this.profile){
      this.profile = {} as Profile;
    }
  }

  ngOnDestroy(): void{
    this.authenticatedUser$.unsubscribe();
  }

}
