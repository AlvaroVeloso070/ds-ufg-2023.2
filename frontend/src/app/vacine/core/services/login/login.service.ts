import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import Login from "../../entities/login";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import User from "../../entities/user";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private router: Router) { }

  doLogin(login: Login) {
    console.log(login);
    this.router.navigate(['/vacine/home/appointments']);
  }

  getFormGroup() : FormGroup {
    return new FormBuilder().group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  logout() {
    // this.router.navigate(['/vacine/login']);
  }

  getUsuarioLogado(){
    return new User("Usuário Logado");
  }
}
