import {Component, OnInit} from '@angular/core';
import {faLock, faUser} from "@fortawesome/free-solid-svg-icons";
import {FormGroup} from "@angular/forms";
import {SignupService} from "../../core/services/signup/signup.service";
import {Router} from "@angular/router";
import Allergy from "../../core/entities/Allergy";
import {AllergyService} from "../../core/services/allergy/allergy.service";
import {OverlayService} from "../../core/services/overlay/overlay.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.sass'
})
export class SignupComponent implements OnInit{

  public formGroup !: FormGroup;
  public alergias : Allergy[] = [];

  constructor(private service : SignupService,
              private router : Router,
              private allergyService : AllergyService,
              private overlayService : OverlayService,
              private messageService : MessageService) { }
  ngOnInit(): void {
    this.formGroup = this.service.getFormGroup();
    this.allergyService.getAlergias().subscribe(
      (allergies: Allergy[]) => {
        this.alergias = allergies
        this.overlayService.updateOverlayState(false)
      }
    )
  }

  protected readonly faUser = faUser;
  protected readonly faLock = faLock;

  readonly generos = [
    {label: 'Masculino', id: 'm'},
    {label: 'Feminino', id: 'f'}
  ]

  submeter() {
    if(this.formGroup.valid){
      this.service.incluirUsuario(this.formGroup);
    }
    else{
      this.messageService.add({
        severity: 'warn',
        summary: 'Dados Inválidos',
        detail: 'Preencha os dados corretamente.'
      })
    }
  }

  voltar(){
    this.router.navigate(['login'])
  }
}
