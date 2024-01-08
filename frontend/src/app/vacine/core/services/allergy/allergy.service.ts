import { Injectable } from '@angular/core';
import Allergy from "../../entities/Allergy";
import Vacina from "../../entities/vacina";

@Injectable({
  providedIn: 'root'
})
export class AllergyService {

  constructor() { }

  getAlergias(){
    let alergias = []
    alergias.push(new Allergy("Alergia a Amendoin", new Vacina("CoronaVac", 1)))
    alergias.push(new Allergy("Alergia a Latex", new Vacina("H1N1", 1)))
    alergias.push(new Allergy("Alergia a Oregano", new Vacina("Poliomelite", 1)))
    alergias.push(new Allergy("Alergia a Abelha", new Vacina("Antitetanica", 1)))
    return alergias;
  }
}
