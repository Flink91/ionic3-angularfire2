import { Component, Output, EventEmitter } from '@angular/core';

import { Account } from '../../models/account/account';

import { AuthProvider } from '../../providers/auth/auth';

import { LoginResponse } from '../../models/login/login-response';

@Component({
  selector: 'register-form',
  templateUrl: 'register-form.html'
})

export class RegisterFormComponent {

  account = {} as Account

  @Output() registerStatus: EventEmitter<LoginResponse>;

  constructor(private auth : AuthProvider) {
    this.registerStatus = new EventEmitter<LoginResponse>();
  }

  async register(){

        try{

        const result = await this.auth.createUserWithEmailAndPassword(this.account);
        this.registerStatus.emit(result);


        console.log("register result: ");
        console.log(result);

        }catch(e){

          console.error(e);
          this.registerStatus.emit(e);


        }
      }

}
