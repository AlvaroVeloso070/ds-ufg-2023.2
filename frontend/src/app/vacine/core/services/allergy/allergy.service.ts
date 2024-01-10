import {Injectable} from '@angular/core';
import Allergy from "../../entities/Allergy";
import Vacina from "../../entities/vacina";

@Injectable({
  providedIn: 'root'
})
export class AllergyService {

  constructor() { }

  getAlergias(){
    let alergias = []
    alergias.push(new Allergy("Alergia a Amendoin", new Vacina(1,"CoronaVac", 1)))
    alergias.push(new Allergy("Alergia a Latex", new Vacina(2,"H1N1", 1)))
    alergias.push(new Allergy("Alergia a Oregano", new Vacina(3, "Poliomelite", 1)))
    alergias.push(new Allergy("Alergia a Abelha", new Vacina(4, "Antitetanica", 1)))
    return alergias;
  }
}
