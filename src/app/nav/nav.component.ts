import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { UserService } from '../Services/user.service';
import { Router } from '@angular/router';
import { ProfileService } from '../Services/profile.service';
import { Cart } from '../models/cart';
import { CartService } from '../Services/cart.service';
import { FavoriteProductService } from '../Services/favorite-product.service';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {

  constructor(
    private userService: UserService, 
    private router: Router, 
    private profileService: ProfileService, 
    private cartService: CartService,
    private favoriteProductService: FavoriteProductService
    ) { }

  isAuthenticated: boolean = false;
  isProfileDropdownOpen: boolean = false;
  isProductAddedToCart: boolean = false;
  isProductAddedToFavorite: boolean = false;

  isAuthenticatedSubscription: Subscription | undefined;
  isProductAddedToCartSubscription: Subscription | undefined;
  isProductAddedToFavoriteSubscription: Subscription | undefined;
  cartCountSubscription: Subscription | undefined;
  favoriteCountSubscription: Subscription | undefined;

  productsInCart: number = 0;
  productsInFavorite: number = 0;

  ngOnInit() {
    document.body.addEventListener('click', this.onClickOutsideNavContainer);

    this.isAuthenticatedSubscription = this.userService.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });

    this.isProductAddedToCartSubscription = this.cartService.isAddedToCart$.subscribe((isAddedToCart: boolean) => {
      this.isProductAddedToCart = isAddedToCart;
    })

    this.cartCountSubscription = this.cartService.cartCount$.subscribe((productsInCart) => {
      this.productsInCart = productsInCart;
    })

    this.isProductAddedToFavoriteSubscription = this.favoriteProductService.isAddedToFavorite$.subscribe((isAddedToFav: boolean) => {
      this.isProductAddedToFavorite = isAddedToFav;
    })

    this.favoriteCountSubscription = this.favoriteProductService.favoriteCount$.subscribe((productsInFavorite) => {
      this.productsInFavorite = productsInFavorite;
    })
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

  onOptionSelect(id: number){
    this.profileService.selectOptionId(id);
  }

  Logout(){
    this.isAuthenticated = false;

    this.userService.setAuthenticated(false);
    this.userService.setAdmin(false);

    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('isAdmin');

    this.userService.logout();

    this.router.navigate(["/"]);
  }

  ngOnDestroy(): void {
    document.body.removeEventListener('click', this.onClickOutsideNavContainer);

    if (this.isAuthenticatedSubscription) {
      this.isAuthenticatedSubscription.unsubscribe();
    }

    if (this.isProductAddedToCartSubscription) {
      this.isProductAddedToCartSubscription.unsubscribe();
    }

    if (this.isProductAddedToFavoriteSubscription) {
      this.isProductAddedToFavoriteSubscription.unsubscribe();
    }

    if (this.cartCountSubscription) {
      this.cartCountSubscription.unsubscribe();
    }

    if (this.favoriteCountSubscription) {
      this.favoriteCountSubscription.unsubscribe();
    }
  }
}
