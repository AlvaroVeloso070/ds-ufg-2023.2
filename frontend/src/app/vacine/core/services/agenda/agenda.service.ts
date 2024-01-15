import {Injectable} from '@angular/core';
import Agenda from "../../entities/agenda";
import Vacina from "../../entities/vacina";
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

  getNextAppointment(userId : number){
    return new Agenda(new Date(), 1, new Vacina(2,'Coronavac', 2), userId)
  }

  getAllAppointments():Observable<Agenda[]>{
    return this.get().pipe(
      map((response:any) => {
        return response.map((agenda:any) => {
          let vacina = new Vacina(agenda.vacina.id, agenda.vacina.titulo, agenda.vacina.doses, agenda.vacina.periodicidade, agenda.vacina.intervalo, agenda.vacina.situacao)
          return new Agenda(agenda.data,  agenda.situacao, vacina, agenda.usuario.id)
        })
      })
    )
  }

  getFormGroup() {
    return this.baseServiceProvider.getFormBuilder().group({
      data: ['', Validators.required],
      vacina: ['', Validators.required],
      vacinaId: ['', Validators.required],
      usuarioId: ['', Validators.required]
    })
  }

  incluirAgendamento(formGroup: FormGroup) {
    if (formGroup.valid) {
      this.post(formGroup.value).subscribe({
        next: () => {
          this.baseServiceProvider.getRouter().navigate(['/appointment']);
        },
        error: (error) => {
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
