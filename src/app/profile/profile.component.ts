import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../Services/user.service';
import { ProfileService } from '../Services/profile.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private profileService: ProfileService) { }

  isAuthenticated: boolean = false;
  isAdmin: boolean = false;
  selectedIndex: number = -1;

  ngOnInit() {
    this.userService.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });

    this.userService.isAdmin$.subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });

    this.profileService.selectedOption$.subscribe((id) => 
    {
      this.selectedIndex = id;
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

  SelectItemIndex(id: number){
    this.selectedIndex = id;
  }
}
