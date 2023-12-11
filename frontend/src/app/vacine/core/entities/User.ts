import Login from "./login";

export default class User{
  constructor(name: string, rg: string = '', phone: string = '', birthDate: Date = new Date(), gender: string = '', motherName: string = '', cpf: string = '', login: Login = new Login('', '')) {
    this.name = name;
    this.rg = rg;
    this.phone = phone;
    this.birthDate = birthDate;
    this.gender = gender;
    this.motherName = motherName;
    this.cpf = cpf;
    this.login = login;
  }

  name!: string;
  rg!: string;
  phone!: string;
  birthDate!: Date;
  gender!: string;
  motherName!: string;
  cpf!: string;
  login!: Login;
}
