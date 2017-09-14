import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewDayPage } from './new-day';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    NewDayPage,
  ],
  imports: [
    IonicPageModule.forChild(NewDayPage),
    ComponentsModule
  ],
})
export class NewDayPageModule {}
