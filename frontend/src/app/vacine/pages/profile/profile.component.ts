import {Component, OnInit} from '@angular/core';
import {UserService} from "../../core/services/user/user.service";
import User from "../../core/entities/user";

@Component({
  selector: 'app-profile',
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

