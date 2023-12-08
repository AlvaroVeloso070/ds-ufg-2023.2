import {Injectable} from '@angular/core';
import Login from "../../entities/Login";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import User from "../../entities/User";

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

  static logout() {
    alert("logout")
  }

  static getUsuarioLogado(){
    return new User("Usuário Logado");
  }
}
