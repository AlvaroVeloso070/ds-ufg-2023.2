import { Injectable } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import User from "../../entities/user";
import Login from "../../entities/login";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getFormGroup(): FormGroup {
    return new FormBuilder().group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      password_confirmation: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      birth_date: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      rg: ['', [Validators.required]],
      sexo: ['', [Validators.required]],
      mother_name: ['', [Validators.required]]
    });
  }

  getUser(id: number) {
    return new User("Usuário Logado", "123456789", "62940028922", new Date(), "M", "Mãe", "628.913.950-93", new Login("email@email.com", "senha123", "senha123"));
  }
}
