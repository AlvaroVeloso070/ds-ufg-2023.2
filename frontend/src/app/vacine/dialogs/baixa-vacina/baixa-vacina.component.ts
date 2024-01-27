import { Component } from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import Agenda from "../../core/entities/Agenda";
import {AgendaService} from "../../core/services/agenda/agenda.service";
import {MessageService} from "primeng/api";

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
  observacao : string = ''

  constructor(private ref:DynamicDialogRef, private config:DynamicDialogConfig, private agendaService : AgendaService, private messageService: MessageService) {
    this.appointment = this.config.data.appointment
    this.loadSituacaoAtual()
    this.situacoes = this.loadSituacoes()
  }

  atualizarSituacao(){
    if(this.novaSituacao == null) this.messageService.add({severity:'error', summary: 'Erro', detail: 'Escolha uma nova situação para o agendamento!'})

    this.agendaService.updateSituacao(this.appointment.id, this.novaSituacao.nome, this.observacao).subscribe(() => {
      this.ref.close(true)
    })
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
