import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/user.service';
import { DecodedToken } from '../models/DecodedToken';
import jwtDecode from 'jwt-decode';
import { User } from '../models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  selectedOption: boolean = false; // false for Login form, true for Register form

  username: string = "";
  password: string = "";
  loginValidationErrors: string[] = [];
  registerValidationErrors: string[] = [];

  user: User = {username: '', password: '', email: ''};

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }
  
  public onLogin(): void
  {
      this.userService
      .loginUser(this.username, this.password)
      .subscribe((response) => 
      {
        const decodedToken = jwtDecode(response) as DecodedToken;
        const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

        localStorage.setItem('token', response);
        localStorage.setItem('role', role);

        this.userService.setAuthenticated(true);
        this.userService.checkIfAdmin();

        this.router.navigate(['/'])

      }, err => 
      {
        // Server returned validation errors
        if(err.status === 401){
          this.loginValidationErrors[0] = "Невалидно потребителско име или парола. Моля, опитайте отново.";
        }
        else{
          this.loginValidationErrors = err.error;
        }
      });
  }

  public onRegister(): void 
  {
      this.userService
      .registerUser(this.user)
      .subscribe(() => 
      {
        this.onLogin();
    }, err =>
    {
       // Server returned validation errors
       this.registerValidationErrors = err.error.errors;
    });
  }

  changeForm(){
    this.selectedOption = !this.selectedOption;
  }
}

