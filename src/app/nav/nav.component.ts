import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private userService: UserService) { }

  isAuthenticated: boolean = false;

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

  onClickOutsideNavContainer = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const navContainer = document.querySelector('.nav-container-mobile') as HTMLElement;

    if (this.mobileNavToggle && !navContainer.contains(target)) {
      this.mobileNavToggle = false;
    }
  }
}
