export default class Allergy{
  id !: number;
  nome !: string;
  vacina !: string;

  constructor(id:number, nome:string, vacina:string) {
    this.id = id;
    this.nome = nome;
    this.vacina = vacina;
  }
}
