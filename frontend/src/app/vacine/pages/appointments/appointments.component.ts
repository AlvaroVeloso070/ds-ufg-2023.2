import {Component, OnInit} from '@angular/core';
import {AgendaService} from "../../core/services/agenda/agenda.service";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import Agenda from "../../core/entities/Agenda";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {UserService} from "../../core/services/user/user.service";
import {OverlayService} from "../../core/services/overlay/overlay.service";
import {FutureAppointmentsComponent} from "../../dialogs/future-appointments/future-appointments.component";
import User from "../../core/entities/User";
import {BaixaVacinaComponent} from "../../dialogs/baixa-vacina/baixa-vacina.component";

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.sass',
  providers: [DialogService]
})
export class AppointmentsComponent implements OnInit{
  constructor(public agendaService:AgendaService, private dialogService: DialogService, private userService : UserService, private overlayService:OverlayService){}

  private usuarioLogado : any
  usuarioAdmin : boolean = false
  displayedColumns = ['Data', 'Vacina', 'Situação', 'Dose']
  displayedColumnsAdmin = ['Paciente', 'Data', 'Vacina', 'Situação', 'Dose', 'Ação']

  nextAppointment : Agenda[] = []
  futureAppointments : Agenda[] = []
  allAppointments : Agenda[] = []

  usuariosAdmin : User[] = []
  userFilter : any = null

  ref: DynamicDialogRef | undefined;

  ngOnInit(): void {
    this.overlayService.updateOverlayState(true)
    this.userService.getUsuarioLogado().subscribe((usuarioLogado) => {

      this.usuarioLogado = usuarioLogado
      this.usuarioAdmin = this.usuarioLogado.isAdmin

      if(!this.usuarioAdmin){
        this.agendaService.getUserAppointments(this.usuarioLogado.id).subscribe((appointments:Agenda[]) => {
          this.allAppointments = this.agendaService.getPastAppointments(appointments)

          this.futureAppointments = this.agendaService.getNextAppointment(appointments)
          this.nextAppointment.push(this.futureAppointments[0]);

          this.overlayService.updateOverlayState(false)
        })
      }
      else{
        this.agendaService.getAllAppointments().subscribe((appointments:Agenda[]) => {
          this.allAppointments = appointments

          this.usuariosAdmin = this.agendaService.getUsersFromAppointments(this.allAppointments)

          this.overlayService.updateOverlayState(false)
        })
      }
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

  openBaixaModalAdmin(appointment: any){
    this.ref = this.dialogService.open(BaixaVacinaComponent, {
      header: 'Situação do Agendamento',
      width: '500px',
      height: '400px',
      baseZIndex: 10000,
      styleClass: 'baixa-vacina-component',
      maximizable: false,
      dismissableMask: true,
      data: {
        appointment: appointment
      }
    })

    this.ref.onClose.subscribe((result : boolean) => {
      if(result) this.getAppointments()
    })
  }

  buscarAgendamentos(){
    this.getAppointments()
  }

  getAppointments(){
    this.overlayService.updateOverlayState(true)
    if(this.userFilter != null){
      this.agendaService.getUserAppointments(this.userFilter.id).subscribe((appointments : Agenda[]) => {
        this.allAppointments = appointments
        this.allAppointments.forEach(app => app.paciente = this.userFilter)

        this.overlayService.updateOverlayState(false)
      })
    }
    else {
      this.agendaService.getAllAppointments().subscribe((appointments:Agenda[]) => {
        this.allAppointments = appointments

        this.overlayService.updateOverlayState(false)
      })
    }
  }

  protected readonly faEdit = faEdit;
}
