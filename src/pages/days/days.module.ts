import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DaysPage } from './days';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    DaysPage,
  ],
  imports: [
    IonicPageModule.forChild(DaysPage),
    ComponentsModule
  ],
})
export class DaysPageModule {}
