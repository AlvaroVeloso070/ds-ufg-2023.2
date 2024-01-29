import {Injectable} from '@angular/core';
import Allergy from "../../entities/Allergy";
import {BaseService} from '../base.service';
import {BaseServiceProvider} from '../base-service.provider';
import {map} from "rxjs";
import {FormGroup, Validators} from "@angular/forms";
import Vacina from "../../entities/Vacina";

@Injectable({
  providedIn: 'root'
})
export class AllergyService extends BaseService{

  constructor(private baseServiceProvider : BaseServiceProvider) {
    super(baseServiceProvider, "/alergia");
  }

  getAlergias(){
    return this.get().pipe(
      map((response: any) => {
        return response.map((alergia: any) => {
          return new Allergy(alergia.id, alergia.nome, alergia.vacina, alergia.vacinaId);
        });
      })
    )
  }

  getFormGroup() {
    return this.baseServiceProvider.getFormBuilder().group({
      nome: ['', Validators.required],
      vacina: [Vacina],
      vacinaId: ['']
    })
  }

  incluirAlergia(formGroup: FormGroup) {
    let obj = formGroup.value
    delete obj['vacina']

    if (formGroup.valid) {
      this.overlayService.updateOverlayState(true)
      this.post(obj).subscribe({
        next: () => {
          this.router.navigate(['vacine/home/allergy']);
        },
        error: (error) => {
          this.overlayService.updateOverlayState(false)
          this.messageService.add(
            {
              severity: 'error',
              summary: 'Erro',
              detail: error.erro
            }
          );
        }
      })
    }else {
      this.baseServiceProvider.getMessageService().add({severity:'warn', summary: 'Atenção!', detail: 'Preencha todos os campos corretamente!'});
    }
  }

}
