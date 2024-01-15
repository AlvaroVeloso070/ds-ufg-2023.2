import {Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {AllergyService} from "../../core/services/allergy/allergy.service";

@Component({
  selector: 'app-new-allergy',
  templateUrl: './new-allergy.component.html',
  styleUrl: './new-allergy.component.sass'
})
export class NewAllergyComponent implements OnInit{
  public formGroup !: FormGroup;

  constructor(private allergyService: AllergyService) {
  }
  ngOnInit(): void {
      this.formGroup = this.allergyService.getFormGroup();
  }

  submeter() {
    this.allergyService.incluirAlergia(this.formGroup);
  }
}
