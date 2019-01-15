import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  uid:string;
  constructor(private afAuth:AngularFireAuth) { 

  }

  //sign up method
  async signUp(email,password){ //asynchronos mean dont wait for this process finish, for example, teacher will continue teaching even student go to toilet, and synchronos, teacher must wait student comback for continue teaching
   try{
     let userData = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
     this.uid = this.afAuth.auth.currentUser.uid;
     return { success:true,uid: this.uid}
   }
   catch(error){
     return {success:false, error:this.handleSignUpError};
   }
  }
  handleSignUpError(error){
    let message = error.message;//message property in firebase
    console.log(message);
    switch( message ){
      case 'auth/email-already-in-use':
        return "Email already used";
      case 'auth/invalid-email':
        return "Please use a valid email address";
      case 'auth/operation-not-allowed':
        return 'sign up is not enabled at the moment';
      case 'auth/weak-password':
        return "password is weak";
      default:
      return null;
    }
  }

 async signIn(email,password){
    try{
      let userData= await this.afAuth.auth.signInWithEmailAndPassword(email,password);
      this.uid=this.afAuth.auth.currentUser.uid;
      return {succes:true, uid:this.uid ,email:email}
    }
    catch(error){
      return {success: false, error:error.message};
    }
  }
  signOut(){
    this.afAuth.auth.signOut()
    .catch((error)=>{

    });
  }
}
