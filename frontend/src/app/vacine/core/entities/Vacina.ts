export default class Vacina {
  titulo!: string
  dose!: number
  descricao!: string
  periodicidade!: string
  intervalo!: number

  constructor(titulo: string = '', dose: number = 0, descricao: string = '', periodicidade: string = '', intervalo: number = 0) {
    this.titulo = titulo;
    this.dose = dose;
    this.descricao = descricao;
    this.periodicidade = periodicidade;
    this.intervalo = intervalo;
  }

}
