import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalsPage } from './modals';

import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
    ModalsPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalsPage),
    Ionic2RatingModule
  ],
})
export class ModalsPageModule {}
