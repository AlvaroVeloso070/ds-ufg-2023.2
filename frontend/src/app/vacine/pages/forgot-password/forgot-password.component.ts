import {Component} from '@angular/core';
import {ForgotPasswordService} from "../../core/services/forgot-password/forgot-password.service";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {
  PasswordRecoveryConfirmationComponent
} from "../../dialogs/password-recovery-confirmation/password-recovery-confirmation.component";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.sass',
  providers: [DialogService]
})
export class ForgotPasswordComponent {

  email: string = '';
  ref: DynamicDialogRef | undefined;

  constructor(private forgotPasswordService: ForgotPasswordService,
              private dialogService: DialogService) {
  }

  sendEmail() {
    this.forgotPasswordService.sendEmail(this.email);

    this.openEmailSentDialog();
  }

  private openEmailSentDialog() {
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
