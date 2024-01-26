import { Component } from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import Agenda from "../../core/entities/Agenda";
import {AgendaService} from "../../core/services/agenda/agenda.service";

@Component({
  selector: 'app-baixa-vacina',
  templateUrl: './baixa-vacina.component.html',
  styleUrl: './baixa-vacina.component.sass'
})
export class BaixaVacinaComponent {
  appointment : Agenda

  situacaoAtual : any = ''
  situacoes : any[]

  novaSituacao : any
  descricao : string = ''

  constructor(private ref:DynamicDialogRef, private config:DynamicDialogConfig, private agendaService : AgendaService) {
    this.appointment = this.config.data.appointment
    this.loadSituacaoAtual()
    this.situacoes = this.loadSituacoes()
  }

  atualizarSituacao(){
    console.log('nova situacao', this.novaSituacao)

    //TODO TEXTAREA DA DESCRIÇÃO E CHAMDA DO SERVICE
  }

  loadSituacaoAtual(){
    switch (this.appointment.situacao){
      case 0:
        this.situacaoAtual = 'Agendado'
        break
      case 1:
        this.situacaoAtual = 'Realizado'
        break
      case 2:
        this.situacaoAtual = 'Cancelado'
        break
    }
  }

  loadSituacoes(){
    let situacoes = [
      {
        situacao: 0,
        nome: 'Agendado'
      },
      {
        situacao: 1,
        nome: 'Realizado'
      },
      {
        situacao: 2,
        nome: 'Cancelado'
      }
    ]


    return situacoes.filter((sit) => {
      return sit.situacao != this.appointment.situacao
    })
  }
}
