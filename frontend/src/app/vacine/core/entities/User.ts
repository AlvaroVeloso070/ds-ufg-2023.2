import Agenda from "./agenda";
import Allergy from "./Allergy";

export default class User {

  id !: number;
  nome !: string;
  dataNascimento !: Date;
  sexo !: string;
  logradouro !: string;
  numero !: number;
  setor !: string;
  cidade !: string;
  uf !: string;
  isAdmin !: boolean;
  email !: string;
  agendamentos !: Agenda[];
  alergias !: Allergy[];


  constructor(id: number, nome: string, dataNascimento: Date, sexo: string, logradouro: string, numero: number, setor: string, cidade: string, uf: string, isAdmin: boolean, email: string, agendamentos: Agenda[], alergias: Allergy[]) {
    this.id = id;
    this.nome = nome;
    this.dataNascimento = dataNascimento;
    this.sexo = sexo;
    this.logradouro = logradouro;
    this.numero = numero;
    this.setor = setor;
    this.cidade = cidade;
    this.uf = uf;
    this.isAdmin = isAdmin;
    this.email = email;
    this.agendamentos = agendamentos;
    this.alergias = alergias;
  }
}


