import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  error: string | null = null;

  handleSignup(form: NgForm){
    this.authService
      .signup(form.value.email, form.value.password)
      .subscribe(res => {
        this.router.navigate(['/consultants']);
      }, err => this.error = err.error.error.message);
    form.reset();
  }

}
