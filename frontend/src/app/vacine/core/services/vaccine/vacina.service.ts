import {Injectable} from '@angular/core';
import Vacina from "../../entities/vacina";

@Injectable({
  providedIn: 'root'
})
export class VacinaService {

  constructor() { }

  getVacinas() {
    let vacinas: Vacina[] = [];
    vacinas.push(new Vacina("CoronaVac", 3, "Vacina contra o Corona Virus", "Meses", 4));
    vacinas.push(new Vacina("H1N1", 2, "Vacina contra a Gripe", "Meses", 6));
    vacinas.push(new Vacina("Poliomelite", 1, "Vacina contra a Poliomelite", "Anos", 1));
    vacinas.push(new Vacina("Antitetanica", 4, "Vacina contra o Tétano", "Dias", 45));
    return vacinas;
  }
}
