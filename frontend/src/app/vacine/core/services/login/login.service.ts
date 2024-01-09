import {Injectable} from '@angular/core';
import Login from "../../entities/login";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import User from "../../entities/user";
import {BaseService} from "../base.service";
import {BaseServiceProvider} from "../base-service.provider";

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService{

  readonly endpoint : string = '/login';

  constructor(baseServiceProvider: BaseServiceProvider) {
    super(baseServiceProvider);
  }

  doLogin(login: Login) {
    this.post(this.endpoint, login).subscribe((response) => {
      this.authService.setToken(response.accessToken);
      this.authService.setIdUsuarioLogado(response.usuarioId);
      this.router.navigate(['/vacine/home/appointments']);
    });
  }

  getFormGroup() : FormGroup {
    return new FormBuilder().group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]
    });
  }

  logout() {
    // this.router.navigate(['/vacine/login']);
  }

  getUsuarioLogado(){
    return new User("Usuário Logado");
  }
}
