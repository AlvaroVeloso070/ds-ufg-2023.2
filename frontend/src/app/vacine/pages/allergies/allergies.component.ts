import {Component, OnInit} from '@angular/core';
import Allergy from "../../core/entities/Allergy";
import {AllergyService} from "../../core/services/allergy/allergy.service";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
  selector: 'app-allergies',
  templateUrl: './allergies.component.html',
  styleUrl: './allergies.component.sass',
  providers: [DialogService]
})
export class AllergiesComponent implements OnInit{
  allergies: Allergy[] = []

  ref: DynamicDialogRef | undefined
  yetToLoad: boolean = true

  constructor(public service:AllergyService, public dialogService:DialogService) {
  }

  ngOnInit() {
    this.listarAlergias();
    this.yetToLoad = true
  }

  listarAlergias() {
    this.service.getAlergias().subscribe(
      (allergies: Allergy[]) => {
        this.allergies = allergies
        this.yetToLoad = false
      }
    )
  }

}
