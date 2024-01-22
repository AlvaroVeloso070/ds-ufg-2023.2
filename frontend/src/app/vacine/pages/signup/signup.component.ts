import {Component, OnInit} from '@angular/core';
import {faLock, faUser} from "@fortawesome/free-solid-svg-icons";
import {FormGroup} from "@angular/forms";
import {SignupService} from "../../core/services/signup/signup.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.sass'
})
export class SignupComponent implements OnInit{

  public formGroup !: FormGroup;

  constructor(private service : SignupService, private router : Router) { }
  ngOnInit(): void {
      this.formGroup = this.service.getFormGroup();
  }

  protected readonly faUser = faUser;
  protected readonly faLock = faLock;

  readonly generos = [
    {label: 'Masculino', id: 'm'},
    {label: 'Feminino', id: 'f'}
  ]

  submeter() {
    this.service.incluirUsuario(this.formGroup);
  }

  voltar(){
    this.router.navigate(['login'])
  }
}
