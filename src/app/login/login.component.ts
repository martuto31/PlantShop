import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/user.service';
import { DecodedToken } from '../models/DecodedToken';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = "";
  password: string = "";

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }
  
  public onSubmit(): void 
  {
      this.userService
      .loginUser(this.username, this.password)
      .subscribe((response) => 
      {
        // const decodedToken = jwtDecode(response) as DecodedToken;
        // const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

        // localStorage.setItem('token', response);
        // localStorage.setItem('role', role);

        // this.userService.setAuthenticated(true);
        // this.userService.checkIfAdmin();

      }, err => 
      {
      });
  }
}

