import { Injectable } from '@angular/core';
import Agenda from "../../entities/agenda";
import Vacina from "../../entities/vacina";

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  constructor() { }

  getNextAppointment(userId : number){
    return new Agenda(new Date(), 1, new Vacina('Coronavac', 2), userId)
  }

  getAllAppointments(userId : number){
    let app = []
    app.push(new Agenda(new Date(), 3, new Vacina('H1N1', 1), userId))
    app.push(new Agenda(new Date(), 3, new Vacina('H1N1', 1), userId))
    app.push(new Agenda(new Date(), 3, new Vacina('H1N1', 1), userId))
    app.push(new Agenda(new Date(), 3, new Vacina('H1N1', 1), userId))
    app.push(new Agenda(new Date(), 3, new Vacina('H1N1', 1), userId))
    app.push(new Agenda(new Date(), 3, new Vacina('H1N1', 1), userId))
    app.push(new Agenda(new Date(), 3, new Vacina('H1N1', 1), userId))
    app.push(new Agenda(new Date(), 3, new Vacina('H1N1', 1), userId))
    return app
  }
}
