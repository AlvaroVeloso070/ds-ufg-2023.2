import {Injectable} from '@angular/core';
import Login from "../../entities/Login";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BaseService} from "../base.service";
import {BaseServiceProvider} from "../base-service.provider";
import {UserService} from "../user/user.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService{

  constructor(baseServiceProvider: BaseServiceProvider, private userService : UserService) {
    super(baseServiceProvider, '/login');
  }

  doLogin(login: Login) {
    this.http.post(this.apiUrl + this.endpoint, login).subscribe({
      next: data => {
        this.authService.autenticarSessao(data);
        this.userService.getUsuarioLogado().subscribe((usuario) => {
          this.messageService.add({severity:'success', summary:'Sucesso!', detail:'Login realizado com sucesso. Bem vindo(a), ' + usuario.nome + '!'});
        });
        this.router.navigate(['/vacine/home/appointments']);
      },
      error: error => {
        this.messageService.add({severity:'error', summary:'Erro!', detail:'Ocorreu um erro ao realizar o login: ' + error.error});
      }
    });
  }



  getFormGroup() : FormGroup {
    return new FormBuilder().group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
