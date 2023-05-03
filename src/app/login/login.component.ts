import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(5)])
  });

  get userName() {
    return this.loginForm.get('userName');
  }

  get password() {
    return this.loginForm.get('password');
  }
  
  constructor(private authService: AuthService, private snackBar: MatSnackBar) {}

  login(form: FormGroup) {
    let userName = form.get('userName')?.value;
    let passWord = form.get('password')?.value;


    if (!this.authService.logIn(userName, passWord)) { 
      this.snackBar.open("Invalid Credentials. Please try again.", "Ok", );
    }
  }
}