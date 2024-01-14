import {Injectable} from '@angular/core';
import Allergy from "../../entities/Allergy";
import {BaseService} from '../base.service';
import {BaseServiceProvider} from '../base-service.provider';
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AllergyService extends BaseService{

  constructor(baseServiceProvider : BaseServiceProvider) {
    super(baseServiceProvider, "/alergia");
  }

  getAlergias(){
    return this.get().pipe(
      map((response: any) => {
        return response.map((alergia: any) => {
          return new Allergy(alergia.id, alergia.nome, alergia.vacina);
        });
      })
    )
  }
}
