import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  isAuthenticated: boolean = false;
  isAdmin: boolean = false;

  ngOnInit() {
    this.userService.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });

    this.userService.isAdmin$.subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });
  }

  Logout(){
    this.isAuthenticated = false;

    this.userService.setAuthenticated(false);
    this.userService.setAdmin(false);

    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('isAdmin');

    this.userService.logout();

    this.router.navigate(["/"])
  }
}
