import {Component, OnInit} from '@angular/core';
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import Vacina from "../../core/entities/Vacina";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {VacinaService} from "../../core/services/vaccine/vacina.service";
import {OverlayService} from "../../core/services/overlay/overlay.service";

@Component({
  selector: 'app-vaccines',
  templateUrl: './vaccines.component.html',
  styleUrl: './vaccines.component.sass',
  providers: [DialogService]
})
export class VaccinesComponent implements OnInit {
  vaccines: Vacina[] = [];

  ref: DynamicDialogRef | undefined;

  constructor(public service: VacinaService, public dialogService: DialogService, public overlayService:OverlayService) {
  }

  ngOnInit(): void {
    this.listarVacinas();
  }

  protected readonly faEdit = faEdit;

  openEditModal(vaccine: Vacina) {
    console.log('vaccine', vaccine);
  }

  listarVacinas(){
    this.overlayService.updateOverlayState(true)
    this.service.getVacinas().subscribe(
      (vaccines: Vacina[]) => {
        this.vaccines = vaccines;
        this.overlayService.updateOverlayState(false)
      }
    );
  }
}
