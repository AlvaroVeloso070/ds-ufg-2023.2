import {Component, OnInit} from '@angular/core';
import {AgendaService} from "../../core/services/agenda/agenda.service";
import Agenda from "../../core/entities/agenda";
import {faSearch} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.sass'
})
export class AppointmentsComponent implements OnInit{
  constructor(public agendaService:AgendaService ){}

  displayedColumns = ['Data', 'Vacina', 'Dose', 'Info']
  nextAppointment : Agenda[] = []
  allAppointments : Agenda[] = []

  ngOnInit(): void {
    this.nextAppointment.push(this.agendaService.getNextAppointment(1))
    this.allAppointments = this.agendaService.getAllAppointments(1)
  }

  openInfoModal(){
    alert('abriu o modal')
  }

  verHistoricoCompleto(){
    alert('carregando historico completo')
  }

  protected readonly faSearch = faSearch;
}
