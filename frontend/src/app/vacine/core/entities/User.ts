import Login from "./Login";

export default class User{
  constructor(name: string) {
    this.name = name;
  }

  name!: string;
  birthDate!: string;
  cpf!: string;
  login!: Login;
}
