import {Injectable} from '@angular/core';
import Login from "../../entities/Login";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import User from "../../entities/User";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private router: Router) { }

  doLogin(login: Login) {
    console.log(login);
    this.router.navigate(['/home']);
  }

  getFormGroup() : FormGroup {
    return new FormBuilder().group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  logout() {
    this.router.navigate(['/login']);
  }

  getUsuarioLogado(){
    return new User("Usuário Logado");
  }
}
