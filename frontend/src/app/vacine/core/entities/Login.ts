export default class Login{

  email!: string;
  password!: string;
  password_confirmation!: string;

  constructor(email: string, password: string, password_confirmation: string = '') {
    this.email = email;
    this.password = password;
    this.password_confirmation = password_confirmation;
  }
}
