import {Component, OnInit} from '@angular/core';
import {AgendaService} from "../../core/services/agenda/agenda.service";
import Agenda from "../../core/entities/agenda";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {AgendaInfoComponent} from "../../dialogs/agenda-info/agenda-info-component";

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.sass',
  providers: [DialogService]
})
export class AppointmentsComponent implements OnInit{
  constructor(public agendaService:AgendaService, private dialogService: DialogService){}

  displayedColumns = ['Data', 'Vacina', 'Situação', 'Dose', 'Info']
  nextAppointment : Agenda[] = []
  allAppointments : Agenda[] = []
  ref: DynamicDialogRef | undefined;
  yetToLoad : boolean = true
  //TODO GET & BLOCKUI OVERLAY

  ngOnInit(): void {
    this.nextAppointment.push(this.agendaService.getNextAppointment(1))
    this.agendaService.getAllAppointments().subscribe((appointments:Agenda[]) => {
      this.allAppointments = appointments
    })
    this.yetToLoad = false
  }

  openInfoModal(appointment: Agenda){
      this.ref = this.dialogService.open(AgendaInfoComponent, {
        header: 'Informações',
        width: '25%',
        contentStyle: {"max-height": "500px", "overflow": "auto"},
        baseZIndex: 10000,
        styleClass: 'agenda-info-modal',
        maximizable: false,
        dismissableMask: true,
        data: {
          agenda: appointment
        }
      });
  }

  verHistoricoCompleto(){
    alert('carregando historico completo')
  }

  protected readonly faSearch = faSearch;
}
