import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  isAuthenticated: boolean = false;
  isProfileDropdownOpen: boolean = false;

  ngOnInit() {
    document.body.addEventListener('click', this.onClickOutsideNavContainer);

    this.userService.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  ngOnDestroy() {
    document.body.removeEventListener('click', this.onClickOutsideNavContainer);
  }

  public mobileNavToggle: boolean = false;

  toggleMobileNav() {
    setTimeout(() => {
      this.mobileNavToggle = !this.mobileNavToggle;
    }, 10);
  }

  toggleProfileDropdown(){
    this.isProfileDropdownOpen = !this.isProfileDropdownOpen;
  }

  onClickOutsideNavContainer = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const navContainer = document.querySelector('.nav-container-mobile') as HTMLElement;

    if (this.mobileNavToggle && !navContainer.contains(target)) {
      this.mobileNavToggle = false;
    }
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
