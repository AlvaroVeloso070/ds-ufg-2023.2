import {Injectable} from '@angular/core';
import {BaseService} from "../base.service";
import {BaseServiceProvider} from "../base-service.provider";
import {FormGroup, Validators} from "@angular/forms";
import {UserService} from "../user/user.service";

@Injectable({
  providedIn: 'root'
})
export class SignupService extends BaseService{

  constructor(private baseServiceProvider : BaseServiceProvider, private userService : UserService ) {
    super(baseServiceProvider, '/usuario');
  }

  getFormGroup() {
    return this.baseServiceProvider.getFormBuilder().group({
      nome: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      senha: ['', Validators.required],
      senhaConfirmacao: ['', Validators.required, Validators.minLength(6)],
      dataNascimento: ['', Validators.required],
      sexo: ['', Validators.required],
      logradouro: ['', Validators.required],
      numero: ['', Validators.required],
      complemento: ['', Validators.required],
      uf: ['', Validators.required],
      setor: ['', Validators.required],
      cidade: ['', Validators.required]
    });
  }

  incluirUsuario(formGroup: FormGroup) {
    //escrever uma funcao que valida se a senha e a confirmação senha sao identicas, caso contrario, exiba uma mensagem de erro justificando este motivo e encerre a execucao dessa funcao

    if (formGroup.get('senha')?.value != formGroup.get('senhaConfirmacao')?.value) {
      this.baseServiceProvider.getMessageService().add({severity: 'warn', summary: 'Aviso!', detail: 'A senha e a confirmação da senha não são iguais.'});
      return;
    }

    this.userService.incluirUsuario(formGroup, 'vacine/home/appointments');

  }
}
