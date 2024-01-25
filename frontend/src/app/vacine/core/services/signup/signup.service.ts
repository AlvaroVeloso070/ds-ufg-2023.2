import {Injectable} from '@angular/core';
import {BaseService} from "../base.service";
import {BaseServiceProvider} from "../base-service.provider";
import {FormGroup, Validators} from "@angular/forms";
import {UserService} from "../user/user.service";
import {formatDate} from "@angular/common";

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
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
      senhaConfirmacao: ['', [Validators.required, Validators.minLength(6)]],
      dataNascimento: ['', Validators.required],
      sexo: ['', Validators.required],
      logradouro: ['', Validators.required],
      numero: ['', Validators.required],
      uf: ['', Validators.required],
      setor: ['', Validators.required],
      cidade: ['', Validators.required]
    });
  }

  incluirUsuario(formGroup: FormGroup) {
    if (formGroup.get('senha')?.value != formGroup.get('senhaConfirmacao')?.value) {
      this.baseServiceProvider.getMessageService().add({severity: 'warn', summary: 'Aviso!', detail: 'A senha e a confirmação da senha não são iguais.'});
      return;
    }

    //patch para bater com o model do back
    formGroup.patchValue({
      dataNascimento: formatDate(formGroup.controls['dataNascimento'].value, 'yyyy-MM-dd', 'en')
    })

    this.userService.incluirUsuario(formGroup, 'vacine/home/appointments');
  }
}
