import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import {Validators,FormBuilder,FormGroup} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  private email:string;
  private password:string;
  private signUpForm: FormGroup;

  constructor(
    private authService:AuthenticationService,
    private formBuilder:FormBuilder
    
    ){}
    ngOnInit(){
      this.signUpForm= this.formBuilder.group({
        email:['',[Validators.required,Validators.email]],
        password:['',[Validators.required, Validators.minLength(6)]]
      });
    }
  signUp( formData ){
    this.authService.signUp(formData.email,formData.password)
    .then( (reponse)=>{
      //sign up successful
      console.log(reponse);
      this.signUpForm.reset()
    })
    .catch( (error)=>{
      console.log(error);
      //sign up failed
    })

  }

}
