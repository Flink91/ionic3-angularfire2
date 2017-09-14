import { NewDayUploadResponse } from './../../models/days/new-day-upload-response';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Day } from '../../models/days/day';
import { storage } from 'firebase';
import { DayProvider } from './../../providers/days/day';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the NewDayFormComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'new-day-form',
  templateUrl: 'new-day-form.html'
})
export class NewDayFormComponent implements OnInit{

  day = {} as Day;
  @Output() newDayUploadStatus: EventEmitter<NewDayUploadResponse>;
  base64Image : string;

  constructor(private DayProvider: DayProvider, private camera: Camera) {
    console.log('Hello NewDayFormComponent Component');
    this.newDayUploadStatus = new EventEmitter<NewDayUploadResponse>();
  }

  ngOnInit(){
    if(!this.day.date){
      this.day.date = new Date();
      console.log("Date wheel set to current date: " + this.day.date.toISOString());
    }
  }

  async login(){

        // const loginResponse = await this.auth.signInWithEmailAndPassword(this.account);
        // this.loginStatus.emit(loginResponse);

  }

  async newDay(day : Day){

    const newDayUploadResponse = await this.DayProvider.addDay(this.day);
    this.newDayUploadStatus.emit(newDayUploadResponse);

      // this.uploadImage().then((savedPicture) => {
      //   console.log("is Pic saved?" + savedPicture);

      // }).catch(function(error){
      //   console.log("error new inner day: " + error);
      // });



  }

  // capture() {
  //       //setup camera options
  //       const options: CameraOptions = {
  //         quality: 80,
  //         targetHeight: 500,
  //         destinationType: this.camera.DestinationType.DATA_URL,
  //         encodingType: this.camera.EncodingType.JPEG,
  //         mediaType: this.camera.MediaType.PICTURE
  //       }

  //       this.camera.getPicture(options).then((imageData) => {
  //         // imageData is either a base64 encoded string or a file URI
  //         // If it's base64:
  //         this.base64Image = 'data:image/jpeg;base64,' + imageData;

  //         // const pictures = storage().ref('pictures');

  //         console.log("Picture taken");
  //        }, (err) => {
  //         // Handle error
  //         console.log("Picture not taken: " + err);
  //        });
  // }

  // async uploadImage(){

  //       try{
  //       this.DayProvider.uploadDayImage(this.base64Image, this.day.date)
  //       .then((savedPicture) => {
  //         console.log("new day then: ");
  //         console.log(savedPicture);
  //         return savedPicture;
  //       });
  //     }catch(e){
  //       return e;
  //     }

  //       return false;
  // }

}
