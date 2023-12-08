import {Injectable} from '@angular/core';
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  ref: DynamicDialogRef | undefined;

  constructor(dialogService: DialogService) { }

  static sendEmail(email: string) {
    alert('Email enviado para: ' + email);


  }
}
