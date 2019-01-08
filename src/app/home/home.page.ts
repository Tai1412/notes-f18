import { Component } from '@angular/core';
import {AuthenticationService} from '../authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private email:string;
  private password:string;

  constructor(private authService:AuthenticationService){

  }
  signUp(){
    // console.log(this.email, this.password);
    this.authService.signUp(this.email,this.password);

  }

}
