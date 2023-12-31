import {Component, OnInit} from '@angular/core';
import Allergy from "../../core/entities/Allergy";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import {AllergyService} from "../../core/services/allergy/allergy.service";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {DeleteDialogComponent} from "../../dialogs/delete-dialog/delete-dialog.component";

@Component({
  selector: 'app-allergies',
  templateUrl: './allergies.component.html',
  styleUrl: './allergies.component.sass',
  providers: [DialogService]
})
export class AllergiesComponent implements OnInit{
  allergies: Allergy[] = []

  ref: DynamicDialogRef | undefined

  constructor(public service:AllergyService, public dialogService:DialogService) {
  }

  ngOnInit() {
    this.allergies = this.service.getAlergias()
  }

  //TODO - MODAIS E CADASTRO DE ALERGIA

  openEditModal(allergy : Allergy){
    console.log('allergy', allergy)
  }

  openDeleteModal(allergy : Allergy){
    this.ref = this.dialogService.open(DeleteDialogComponent, {
      header: 'Excluir',
      dismissableMask: true,
      closable: false,
      data: {
        allergy: allergy
      }
    })
  }

  protected readonly faEdit = faEdit;
  protected readonly faTrash = faTrash;
}
