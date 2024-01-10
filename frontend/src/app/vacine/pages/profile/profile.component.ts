import {Component, OnInit} from '@angular/core';
import {UserService} from "../../core/services/user/user.service";
import User from "../../core/entities/user";
import Gender from "../../core/entities/gender";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.sass'
})
export class ProfileComponent implements OnInit{

  constructor(private userService: UserService) { }

  user !: User;
  genders: Gender[] = this.userService.getGenders();

  ngOnInit(): void {
    this.userService.getUser(1).subscribe((user) => {
      this.user = user;
    });

    this.genders = this.userService.getGenders();
  }

}

