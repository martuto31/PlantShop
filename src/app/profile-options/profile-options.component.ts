import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../Services/user.service';
import { PasswordResetDTO } from '../models/passwordResetDTO';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile-options',
  templateUrl: './profile-options.component.html',
  styleUrls: ['./profile-options.component.css']
})
export class ProfileOptionsComponent implements OnInit, OnDestroy {

  constructor(private userService: UserService) { }

  passwordResetDTO: PasswordResetDTO = {email: '', newPassword: '', token: ''}
  private changePasswordSubscription: Subscription | undefined;

  ngOnInit(): void {
    let token = localStorage.getItem('token');
    this.passwordResetDTO.token = token ?? '';
  }

  changePassword(){
    this.changePasswordSubscription = this.userService.changePassword(this.passwordResetDTO).subscribe(() =>{
      console.log('Password changed successfully');
    }, err => {
      console.log(err);
    })
  }

  ngOnDestroy(): void {
    if (this.changePasswordSubscription) {
      this.changePasswordSubscription.unsubscribe();
    }
  }
}
