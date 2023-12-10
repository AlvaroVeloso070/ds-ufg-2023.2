import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserService} from "../../core/services/user/user.service";
import User from "../../core/entities/User";
import {TextboxComponent} from "../../components/textbox/textbox.component";
import {DateFieldComponent} from "../../components/date-field/date-field.component";
import {PasswordFieldComponent} from "../../components/password-field/password-field.component";
import {PrimaryBtnComponent} from "../../components/primary-btn/primary-btn.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, TextboxComponent, DateFieldComponent, PasswordFieldComponent, PrimaryBtnComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.sass'
})
export class ProfileComponent implements OnInit{

  constructor(private userService: UserService) { }

  user !: User;

  ngOnInit(): void {
    this.user = this.userService.getUser(1);
  }

}
