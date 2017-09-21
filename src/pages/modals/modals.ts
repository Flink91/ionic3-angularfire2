import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';
import { ImageProvider } from '../../providers/image/image';
import { PreloaderProvider } from '../../providers/preloader/preloader';
import { DatabaseProvider } from '../../providers/data/database';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-modals',
  templateUrl: 'modals.html'
})
export class ModalsPage {

   public form              : any;
   public days              : any;
   public dayId             : any;
   public dayDate           : any;
   public dayDesc           : any     = '';
   public dayImg            : any     = '';
   public dayRating         : any     = '';
   public isEditable        : boolean = false;


   constructor(
      public navCtrl        : NavController,
      public params         : NavParams,
      private _FB 	        : FormBuilder,
      private _IMG          : ImageProvider,
      public viewCtrl       : ViewController,
      private _LOADER       : PreloaderProvider,
      private _DB           : DatabaseProvider,
      private afAuth        : AngularFireAuth
   )
   {
      this.form 		= _FB.group({
         'desc' 		: ['', Validators.maxLength(140)],
         'date' 		: ['', Validators.required],
         'img'		  : ['', Validators.required],
         'rating'		: ['', Validators.required]
      });

      this.days = firebase.database().ref(`/days/${this.afAuth.auth.currentUser.uid}`);


      if(params.get('isEdited'))
      {
          let day 		    = params.get('day');

          this.dayRating   	= day.rating;
          this.dayDate    	= day.date;
          this.dayImg       = day.img;
          this.dayDesc      = day.desc;
          this.dayId        = day.$key;
          this.isEditable      = true;
      }
   }




   saveDay(val)
   {
      this._LOADER.displayPreloader();

      let desc 	  : string  = this.form.controls["desc"].value,
  		  rating  	: number	= this.form.controls["rating"].value,
        image     : string  = this.dayImg,
        date      : Date    = this.dayDate;

      if(this.isEditable)
      {

         if(image !== this.dayImg)
         {
            this._DB.uploadImage(image, date)
            .then((snapshot : any) =>
            {
               let uploadedImage : any = snapshot.downloadURL;

               this._DB.updateDatabase(this.dayId,
               {
	              rating   : rating,
                img    : uploadedImage,
                desc     : desc,
                date     : date
	           })
               .then((data) =>
               {
                  this._LOADER.hidePreloader();
               });

            });
         }
         else
         {

           this._DB.updateDatabase(this.dayId,
           {
	          rating   : rating,
            desc     : desc,
            date     : date
	       })
           .then((data) =>
           {
              this._LOADER.hidePreloader();
           });
	     }

      }
      else
      {
         this._DB.uploadImage(image, date)
         .then((snapshot : any) =>
         {
            let uploadedImage : any = snapshot.downloadURL;

            this._DB.addToDatabase({
              rating   : rating,
              img    : uploadedImage,
              desc     : desc,
              date     : date
	        })
            .then((data) =>
            {
               this._LOADER.hidePreloader();
            });
         });

      }
      this.closeModal(true);
   }



   closeModal(val = null)
   {
     //TODO: sometimes tries to dismiss twice?
      this.viewCtrl.dismiss(val);
   }



   selectImage()
   {
      this._IMG.selectImage()
      .then((data) =>
      {
         this.dayImg = data;
      });
   }


}
