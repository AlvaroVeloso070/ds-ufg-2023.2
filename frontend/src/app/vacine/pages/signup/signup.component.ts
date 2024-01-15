import {Component, OnInit} from '@angular/core';
import {faLock, faUser} from "@fortawesome/free-solid-svg-icons";
import {FormGroup} from "@angular/forms";
import {SignupService} from "../../core/services/signup/signup.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.sass'
})
export class SignupComponent implements OnInit{

  public formGroup !: FormGroup;

  constructor(private service : SignupService) { }
  ngOnInit(): void {
      this.formGroup = this.service.getFormGroup();
  }

  protected readonly faUser = faUser;
  protected readonly faLock = faLock;

  readonly generos = [
    {label: 'Masculino', id: 'M'},
    {label: 'Feminino', id: 'F'}
  ]

  submeter() {
    this.service.incluirUsuario(this.formGroup);
  }
}
