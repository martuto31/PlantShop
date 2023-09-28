import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/user.service';
import { PasswordResetDTO } from '../models/passwordResetDTO';

@Component({
  selector: 'app-profile-options',
  templateUrl: './profile-options.component.html',
  styleUrls: ['./profile-options.component.css']
})
export class ProfileOptionsComponent implements OnInit {

  constructor(private userService: UserService) { }

  passwordResetDTO: PasswordResetDTO = {email: '', newPassword: '', token: ''}

  ngOnInit(): void {
    let token = localStorage.getItem('token');
    this.passwordResetDTO.token = token ?? '';
  }

  changePassword(){
    this.userService.changePassword(this.passwordResetDTO).subscribe(() =>{
      console.log('Password changed successfully');
    }, err => {
      console.log(err);
    })
  }
}
