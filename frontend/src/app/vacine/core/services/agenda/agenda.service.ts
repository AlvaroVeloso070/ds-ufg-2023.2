import {Injectable} from '@angular/core';
import Agenda from "../../entities/Agenda";
import Vacina from "../../entities/Vacina";
import {BaseService} from "../base.service";
import {BaseServiceProvider} from "../base-service.provider";
import {map, Observable} from "rxjs";
import {FormGroup, Validators} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class AgendaService extends BaseService{

  constructor(private baseServiceProvider: BaseServiceProvider) {
    super(baseServiceProvider, '/agenda');
  }

  getNextAppointment(appointments : Agenda[]) : any{
    appointments = appointments.filter((item:any) => {
      let dataAp = new Date(item.data)
      return dataAp >= new Date()
    }).sort((agendaA, agendaB) => {
      let dataA = new Date(agendaA.data)
      let dataB = new Date(agendaB.data)

      return dataA.getTime() - dataB.getTime()
    })

    return appointments
  }

  getPastAppointments(appointments : Agenda[]):Agenda[]{
    appointments = appointments.filter((item:any) => {
      let dataAp = new Date(item.data)
      return dataAp <= new Date()
    })

    return appointments
  }

  getUserAppointments(id: number):Observable<Agenda[]>{
    let params = {
      "usuarioId": id
    }

    return this.getAppointmentsWithParams(params).pipe(
      map((response:any) => {
        return response.map((agenda:any) => {
          let vacina = new Vacina(agenda.vacina.id, agenda.vacina.titulo, agenda.vacina.doses, agenda.vacina.periodicidade, agenda.vacina.intervalo, agenda.vacina.situacao)
          return new Agenda(agenda.data,  agenda.situacao, vacina, agenda.usuarioId)
        })
      })
    )
  }

  getFormGroup() {
    return this.baseServiceProvider.getFormBuilder().group({
      data: ['', Validators.required],
      vacinaId: ['', Validators.required],
      usuarioId: ['', Validators.required]
    })
  }

  incluirAgendamento(formGroup: FormGroup) {
    if (formGroup.valid) {
      this.overlayService.updateOverlayState(true)
      this.post(formGroup.value).subscribe({
        next: () => {
          this.baseServiceProvider.getRouter().navigate(['vacine/home/appointments']);
          this.overlayService.updateOverlayState(false)
        },
        error: (error) => {
          this.overlayService.updateOverlayState(false)
          this.baseServiceProvider.getMessageService().add(
            {
              severity: 'error',
              summary: 'Erro',
              detail: error.error
            }
          );
        }
      })
    }else {
      this.baseServiceProvider.getMessageService().add({severity:'error', summary: 'Erro', detail: 'Preencha todos os campos corretamente!'});
    }
  }

  getPacienteId() : number {
    return this.authService.getIdUsuarioLogado();
  }
}
