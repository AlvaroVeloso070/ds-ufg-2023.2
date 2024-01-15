import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import User from "../../entities/user";
import Gender from "../../entities/gender";
import {BaseService} from "../base.service";
import {BaseServiceProvider} from "../base-service.provider";
import {catchError, from, map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService{

  constructor(private baseServiceProvider : BaseServiceProvider) {
    super(baseServiceProvider,  '/usuario');
  }

  getFormGroup(): FormGroup {
    return new FormBuilder().group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dataNascimento: ['', Validators.required],
      sexo: ['', Validators.required],
      logradouro: ['', Validators.required],
      numero: ['', Validators.required],
      uf: ['', Validators.required],
      setor: ['', Validators.required],
      cidade: ['', Validators.required]
    });
  }

  getUser(id: number) : Observable<User> {
    return this.getById(id);
  }

  getUsuarioLogado(): Observable<User> {
    const cachedUser = sessionStorage.getItem('usuarioLogado');

    if (cachedUser) {
      return new Observable<User>(subscriber => {
        subscriber.next(JSON.parse(cachedUser));
      });
    } else {
      return from(this.getUser(this.authService.getIdUsuarioLogado())).pipe(
        map((usuario: User) => {
          sessionStorage.setItem('usuarioLogado', JSON.stringify(usuario));
          return usuario;
        }),
        catchError(error => {
          return new Observable<User>();
        })
      );
    }
  }

  getGenders(): Gender[]{
    return [
      new Gender('m', 'Masculino'),
      new Gender('f', 'Feminino')
    ];
  }

  incluirUsuario(formGroup: FormGroup, proximaRota: string) {
    if (formGroup.valid) {
      this.overlayService.updateOverlayState(true)
      this.post(formGroup.value).subscribe({
        next: () => {
          this.router.navigate([proximaRota]);
          this.overlayService.updateOverlayState(false)
        },
        error: (error) => {
          this.overlayService.updateOverlayState(false)
          this.messageService.add(
            {
              severity: 'error',
              summary: 'Erro',
              detail: error.error
            }
          );
        }
      })
    }

  }
}
