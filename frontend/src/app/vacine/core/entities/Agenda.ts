import Vacina from "./vacina";


export default class Agenda {
  data !: Date
  situacao !: number

  vacina !: Vacina
  pacienteId !: number

  constructor(data : Date, situacao : number, vacina : Vacina, pacienteId : number){
    this.data = data
    this.situacao = situacao
    this.vacina = vacina
    this.pacienteId = pacienteId
  }
}
