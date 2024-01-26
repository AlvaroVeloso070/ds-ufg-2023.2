import Vacina from "./Vacina";


export default class Agenda {
  data !: Date
  situacao !: number

  vacina !: Vacina
  paciente !: any

  constructor(data : Date, situacao : number, vacina : Vacina, paciente : any){
    this.data = data
    this.situacao = situacao
    this.vacina = vacina
    this.paciente = paciente
  }
}
