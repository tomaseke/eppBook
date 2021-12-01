import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {AuthUserModel} from "./auth-user.model";
import {BehaviorSubject, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<AuthUserModel | null>(null);

  constructor(private http: HttpClient) {
  }

  signup(email: string, password: string) {
    const signupObj = {
      email,
      password,
      returnSecureToken: true
    }
    return this.http
      .post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseKey}`, signupObj)
      .pipe(tap((res: any) => {
        this.handleAuth(res.email, res.localId, res.idToken, res.expiresIn);
      }))
  }

  login(email: string, password: string) {
    const signupObj = {
      email,
      password,
      returnSecureToken: true
    }
    return this.http
      .post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseKey}`, signupObj).pipe(tap((res: any) => {
        this.handleAuth(res.email, res.localId, res.idToken, res.expiresIn);
      }))
  }

  handleAuth(email:string, localId:string, idToken:string, expiresIn:number){

      const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
      const user = new AuthUserModel(email, localId, idToken, expirationDate);
      this.user.next(user);
      localStorage.setItem('userData', JSON.stringify(user));
  }

  logout(){
    this.user.next(null);
    localStorage.removeItem('userData');
  }

  autoLogin(){
    const userData = JSON.parse(localStorage.getItem('userData')!);
    if(!userData) return;

    const loadedUser = new AuthUserModel(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate))
    if(loadedUser.token){
      this.user.next(loadedUser);
    }
  }

}

