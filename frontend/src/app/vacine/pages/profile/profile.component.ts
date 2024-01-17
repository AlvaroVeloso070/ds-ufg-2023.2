import {Component, OnInit} from '@angular/core';
import {UserService} from "../../core/services/user/user.service";
import User from "../../core/entities/User";
import Gender from "../../core/entities/gender";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.sass'
})
export class ProfileComponent implements OnInit{

  constructor(private userService: UserService) { }
  formGroup !: FormGroup
  user !: User;
  genders: Gender[] = this.userService.getGenders();
  loadedUser : boolean = false

  ngOnInit(): void {
    this.formGroup = this.userService.getFormGroup()
    this.genders = this.userService.getGenders();

    this.userService.getUsuarioLogado().subscribe((usuarioLogado) => {
      this.user = usuarioLogado
      this.loadFormGroup()
    })
  }

  loadFormGroup(){
    this.formGroup.setValue({
      nome: this.user.nome,
      email: this.user.email,
      dataNascimento: new Date(this.user.dataNascimento),
      sexo: {
        id: this.user.sexo,
        name: this.user.sexo == 'm' ? 'Masculino':'Feminino'
      },
      logradouro: this.user.logradouro,
      numero: this.user.numero,
      setor: this.user.setor,
      cidade: this.user.cidade,
      uf: this.user.uf
    })

    this.loadedUser = true
  }
}

