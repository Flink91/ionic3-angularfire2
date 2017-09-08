import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import { LoginFormComponent } from './login-form/login-form';
import { RegisterFormComponent } from './register-form/register-form';
import { EditProfileFormComponent } from './edit-profile-form/edit-profile-form';
import { ProfileViewComponent } from './profile-view/profile-view';
import { DayComponent } from './day/day';

@NgModule({
  declarations: [LoginFormComponent,
    RegisterFormComponent,
    EditProfileFormComponent,
    ProfileViewComponent,
    DayComponent],
  imports: [IonicModule],
  exports: [LoginFormComponent,
    RegisterFormComponent,
    EditProfileFormComponent,
    ProfileViewComponent,
    DayComponent]
})

export class ComponentsModule {

}
