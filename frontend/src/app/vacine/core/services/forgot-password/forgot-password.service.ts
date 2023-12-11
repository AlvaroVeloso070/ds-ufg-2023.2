import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor() { }

  sendEmail(email: string) {
    console.log('Email enviado para: ' + email);
  }
}
