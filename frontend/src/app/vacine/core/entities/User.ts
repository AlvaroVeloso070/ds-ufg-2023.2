import Login from "./Login";

export default class User {

  constructor(name: string, rg: string = '', phone: string = '', birthDate: Date = new Date(), sexo: string = '', motherName: string = '', cpf: string = '', login: Login = new Login('', '')) {
    this.name = name;
    this.rg = rg;
    this.phone = phone;
    this.birthDate = birthDate;
    this.sexo = sexo;
    this.motherName = motherName;
    this.cpf = cpf;
    this.login = login;
  }

  name!: string;
  rg!: string;
  phone!: string;
  birthDate!: Date;
  sexo!: string;
  motherName!: string;
  cpf!: string;
  login!: Login;
}
