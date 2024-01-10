import {Component, OnInit} from '@angular/core';
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import Vacina from "../../core/entities/vacina";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {VacinaService} from "../../core/services/vaccine/vacina.service";
import {DeleteDialogComponent} from "../../dialogs/delete-dialog/delete-dialog.component";

@Component({
  selector: 'app-vaccines',
  templateUrl: './vaccines.component.html',
  styleUrl: './vaccines.component.sass',
  providers: [DialogService]
})
export class VaccinesComponent implements OnInit {
  vaccines: Vacina[] = [];

  ref: DynamicDialogRef | undefined;

  constructor(public service: VacinaService, public dialogService: DialogService) {
  }

  ngOnInit(): void {
    this.carregarListagem();
  }

  protected readonly faEdit = faEdit;
  protected readonly faTrash = faTrash;

  openEditModal(vaccine: Vacina) {
    console.log('vaccine', vaccine);
  }

  carregarListagem(){
    this.service.getVacinas().subscribe(
      (vaccines: Vacina[]) => {
        this.vaccines = vaccines;
      }
    );
  }

  openDeleteModal(vaccine: Vacina) {
    this.ref = this.dialogService.open(DeleteDialogComponent, {
      header: 'Excluir',
      dismissableMask: true,
      closable: false,
      data: {
        vaccine: vaccine
      }
    });

  }
}
