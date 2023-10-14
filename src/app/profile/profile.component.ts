import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../Services/user.service';
import { ProfileService } from '../Services/profile.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  constructor(private router: Router, private userService: UserService, private profileService: ProfileService) { }

  isAuthenticated: boolean = false;
  isAdmin: boolean = false;
  selectedIndex: number = -1;

  private isAuthenticatedSubscription: Subscription | undefined;
  private isAdminSubscription: Subscription | undefined;
  private selectedOptionSubscription: Subscription | undefined;

  ngOnInit() {
    this.isAuthenticatedSubscription = this.userService.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });

    this.isAdminSubscription = this.userService.isAdmin$.subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });

    this.selectedOptionSubscription = this.profileService.selectedOption$.subscribe((id) => 
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

  ngOnDestroy(): void {
    if (this.isAuthenticatedSubscription) {
      this.isAuthenticatedSubscription.unsubscribe();
    }

    if (this.isAdminSubscription) {
      this.isAdminSubscription.unsubscribe();
    }

    if (this.selectedOptionSubscription) {
      this.selectedOptionSubscription.unsubscribe();
    }
  }
}
