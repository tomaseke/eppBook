import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

  error: string | null = null;

  handleLogin(form: NgForm){
    this.authService
      .login(form.value.email, form.value.password)
      .subscribe(res => console.log(res));
    form.reset();
  }

}
