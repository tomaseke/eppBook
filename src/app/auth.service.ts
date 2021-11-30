import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signup(email: string, password:string){
    const signupObj = {
      email,
      password,
      returnSecureToken: true
    }
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseKey}`, signupObj)
  }

  login(email: string, password:string){
    const signupObj = {
      email,
      password,
      returnSecureToken: true
    }
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseKey}`, signupObj)
  }
}
