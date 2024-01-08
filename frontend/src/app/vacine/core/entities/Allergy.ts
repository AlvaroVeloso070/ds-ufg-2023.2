import Vacina from "./vacina";

export default class Allergy{
  nome !: string
  vacina !: Vacina

  constructor(nome:string, vacina:Vacina) {
    this.nome = nome
    this.vacina = vacina
  }
}
