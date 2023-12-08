import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {LogoComponent} from "../../components/logo/logo.component";
import {PrimaryBtnComponent} from "../../components/primary-btn/primary-btn.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {TextboxComponent} from "../../components/textbox/textbox.component";
import {ForgotPasswordService} from "../../core/services/forgot-password/forgot-password.service";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {
  PasswordRecoveryConfirmationComponent
} from "../../dialogs/password-recovery-confirmation/password-recovery-confirmation.component";

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FaIconComponent, LogoComponent, PrimaryBtnComponent, ReactiveFormsModule, InputTextModule, TextboxComponent, FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.sass',
  providers: [DialogService]
})
export class ForgotPasswordComponent {

  email: string = '';
  ref: DynamicDialogRef | undefined;

  constructor(private dialogService: DialogService) {
  }

  sendEmail() {
    alert(this.email)
    ForgotPasswordService.sendEmail(this.email);

    this.openEmailSentDialog();
  }

  private openEmailSentDialog() {
    //TODO: corrigir o bug na abertura do modal de confirmacao
    // https://primeng.org/dynamicdialog
    this.ref = this.dialogService.open(PasswordRecoveryConfirmationComponent, {
      header: 'Recuperação de senha',
      width: '70%',
      contentStyle: {"max-height": "500px", "overflow": "auto"},
      baseZIndex: 10000,
      styleClass: 'password-recovery-modal',
      maximizable: false
    });
  }
}
