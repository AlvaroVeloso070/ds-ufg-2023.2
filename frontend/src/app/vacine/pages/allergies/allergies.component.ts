import {Component, OnInit} from '@angular/core';
import Allergy from "../../core/entities/Allergy";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
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
    this.yetToLoad = false
  }

  listarAlergias() {
    this.service.getAlergias().subscribe(
      (allergies: Allergy[]) => {
        this.allergies = allergies
      }
    )
  }

  //TODO - MODAIS E CADASTRO DE ALERGIA

  openEditModal(allergy : Allergy){
    console.log('allergy', allergy)
  }

  protected readonly faEdit = faEdit;
  protected readonly faTrash = faTrash;
}
