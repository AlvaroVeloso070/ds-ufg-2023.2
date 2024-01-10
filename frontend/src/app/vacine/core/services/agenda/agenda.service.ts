import {Injectable} from '@angular/core';
import Agenda from "../../entities/agenda";
import Vacina from "../../entities/vacina";
import {BaseService} from "../base.service";
import {BaseServiceProvider} from "../base-service.provider";
import {map, Observable} from "rxjs";

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
          return new Agenda(agenda.data,  agenda.situacao, new Vacina(agenda.vacina.id, agenda.vacina.titulo, agenda.vacina.doses), agenda.usuario.id)
        })
      })
    )
  }
}
