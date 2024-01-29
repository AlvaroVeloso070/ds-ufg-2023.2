import {Injectable} from '@angular/core';
import {BaseService} from "../base.service";
import {BaseServiceProvider} from "../base-service.provider";
import Vacina from "../../entities/vacina";
import {map, Observable} from "rxjs";
import {FormGroup, Validators} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class VacinaService extends BaseService {

  constructor(private baseServiceProvider: BaseServiceProvider) {
    super(baseServiceProvider, '/vacina');
  }

  getVacinas(): Observable<Vacina[]> {
    return this.get().pipe(
      map((response: any) => {
        return response.map((vacina: any) => {
          return new Vacina(vacina.id, vacina.titulo, vacina.doses, vacina.descricao, vacina.periodicidade, vacina.intervalo);
        });
      }));
  }

  getFormGroup() {
    return this.baseServiceProvider.getFormBuilder().group({
      titulo: ['', Validators.required],
      doses: ['', Validators.required],
      descricao: ['', Validators.required],
      periodicidade: ['', Validators.required],
      periodicidadeSelecionada: ['', Validators.required],
      intervalo: ['', Validators.required]
    });
  }

  incluirVacina(formGroup: FormGroup) {
    if (formGroup.valid) {
      this.overlayService.updateOverlayState(true)
      this.post(formGroup.value).subscribe({
        next: () => {
          this.router.navigate(['vacine/home/vaccine']);
          this.overlayService.updateOverlayState(false)
        },
        error: (error) => {
          this.overlayService.updateOverlayState(false)
          this.messageService.add(
            {
              severity: 'error',
              summary: 'Erro',
              detail: error.error
            }
          );
        }
      })
    }

  }
}
