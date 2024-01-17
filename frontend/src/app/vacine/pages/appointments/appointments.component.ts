import {Component, OnInit} from '@angular/core';
import {AgendaService} from "../../core/services/agenda/agenda.service";
import Agenda from "../../core/entities/Agenda";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {UserService} from "../../core/services/user/user.service";
import {OverlayService} from "../../core/services/overlay/overlay.service";
import {FutureAppointmentsComponent} from "../../dialogs/future-appointments/future-appointments.component";

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.sass',
  providers: [DialogService]
})
export class AppointmentsComponent implements OnInit{
  constructor(public agendaService:AgendaService, private dialogService: DialogService, private userService : UserService, private overlayService:OverlayService){}

  private usuarioLogado : any
  displayedColumns = ['Data', 'Vacina', 'Situação', 'Dose']
  nextAppointment : Agenda[] = []
  futureAppointments : Agenda[] = []
  allAppointments : Agenda[] = []
  ref: DynamicDialogRef | undefined;

  ngOnInit(): void {
    this.overlayService.updateOverlayState(true)
    this.userService.getUsuarioLogado().subscribe((usuarioLogado) => {
      this.usuarioLogado = usuarioLogado
      this.agendaService.getUserAppointments(this.usuarioLogado.id).subscribe((appointments:Agenda[]) => {
        console.log('app', appointments)
        this.allAppointments = this.agendaService.getPastAppointments(appointments)

        this.futureAppointments = this.agendaService.getNextAppointment(appointments)
        this.nextAppointment.push(this.futureAppointments[0]);

        this.overlayService.updateOverlayState(false)
      })
    })
  }

  verCompromissosFuturos(){
      this.ref = this.dialogService.open(FutureAppointmentsComponent, {
        header: 'Compromissos Futuros',
        width: '45%',
        contentStyle: {"max-height": "500px", "overflow": "auto"},
        baseZIndex: 10000,
        styleClass: 'future-appointments-component',
        maximizable: false,
        dismissableMask: true,
        data: {
          futureAppointments: this.futureAppointments
        }
      });


  }


}
