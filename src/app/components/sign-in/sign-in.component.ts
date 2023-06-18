import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
    faLock = faLock;
    loginForm = new FormGroup({
      email: new FormControl('',Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('',Validators.required),
    });
    submitted = false;
    errorMSG : string = "";
    constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router) {}
    ngOnInit(): void {
      
    
      if (this.auth.isLoggedIn()) {
        this.router.navigate(['admin']);
      }
    }
    onSubmit(): void {

      this.submitted = true;
      if (this.loginForm.valid) {
        if(this.auth.login(this.loginForm.value))
        {
          this.router.navigate(['/admin']);
        }
        else{
          this.errorMSG = "User name and password not matct."
        }
        
      }
    }
  }
  