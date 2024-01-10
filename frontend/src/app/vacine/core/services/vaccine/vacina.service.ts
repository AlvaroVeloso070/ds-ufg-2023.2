import {Injectable} from '@angular/core';
import {BaseService} from "../base.service";
import {BaseServiceProvider} from "../base-service.provider";
import Vacina from "../../entities/vacina";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VacinaService extends BaseService {

  constructor(private baseServiceProvider: BaseServiceProvider) {
    super(baseServiceProvider);
  }

  getVacinas(): Observable<Vacina[]> {
    return this.get('/vacina').pipe(
      map((response: any) => {
        return response.map((vacina: any) => {
          return new Vacina(vacina.id, vacina.titulo, vacina.doses, vacina.descricao, vacina.periodicidade, vacina.intervalo);
        });
      }));
  }
}
