import {Injectable} from '@angular/core';
import Login from "../../entities/Login";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  static login(login: Login) {
    alert("email: " + login.email + " senha:" + login.password)
  }

  static getFormGroup() : FormGroup {
    return new FormBuilder().group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
}
