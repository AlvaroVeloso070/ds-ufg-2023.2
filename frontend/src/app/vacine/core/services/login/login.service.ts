import {Injectable} from '@angular/core';
import Login from "../../entities/login";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BaseService} from "../base.service";
import {BaseServiceProvider} from "../base-service.provider";

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService{

  constructor(baseServiceProvider: BaseServiceProvider) {
    super(baseServiceProvider, '/login');
  }

  doLogin(login: Login) {
    this.post(login).subscribe((response) => {
      this.authService.autenticarSessao(response);
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
}
