import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewDayPage } from './new-day';

@NgModule({
  declarations: [
    NewDayPage,
  ],
  imports: [
    IonicPageModule.forChild(NewDayPage),
  ],
})
export class NewDayPageModule {}
