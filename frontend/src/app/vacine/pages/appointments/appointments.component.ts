import {Component, OnInit} from '@angular/core';
import {AgendaService} from "../../core/services/agenda/agenda.service";
import Agenda from "../../core/entities/agenda";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {AgendaInfoComponent} from "../../dialogs/agenda-info/agenda-info-component";
import {UserService} from "../../core/services/user/user.service";

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.sass',
  providers: [DialogService]
})
export class AppointmentsComponent implements OnInit{
  constructor(public agendaService:AgendaService, private dialogService: DialogService, private userService : UserService){}

  private usuarioLogado : any
  displayedColumns = ['Data', 'Vacina', 'Situação', 'Dose', 'Info']
  nextAppointment : Agenda[] = []
  allAppointments : Agenda[] = []
  ref: DynamicDialogRef | undefined;
  yetToLoad : boolean = true

  ngOnInit(): void {
    this.userService.getUsuarioLogado().subscribe((usuarioLogado) => {
      this.usuarioLogado = usuarioLogado
      this.agendaService.getUserAppointments(this.usuarioLogado.id).subscribe((appointments:Agenda[]) => {
        this.allAppointments = this.agendaService.getPastAppointments(appointments)
        this.nextAppointment.push(this.agendaService.getNextAppointment(appointments));
        this.yetToLoad = false
      })
    })
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
