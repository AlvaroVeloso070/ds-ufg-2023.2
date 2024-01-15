import {Component, OnInit} from '@angular/core';
import Allergy from "../../core/entities/Allergy";
import {AllergyService} from "../../core/services/allergy/allergy.service";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {OverlayService} from "../../core/services/overlay/overlay.service";

@Component({
  selector: 'app-allergies',
  templateUrl: './allergies.component.html',
  styleUrl: './allergies.component.sass',
  providers: [DialogService]
})
export class AllergiesComponent implements OnInit{
  allergies: Allergy[] = []

  ref: DynamicDialogRef | undefined

  constructor(public service:AllergyService, public dialogService:DialogService, public overlayService:OverlayService) {
  }

  ngOnInit() {
    this.overlayService.updateOverlayState(true)
    this.listarAlergias();
  }

  listarAlergias() {
    this.service.getAlergias().subscribe(
      (allergies: Allergy[]) => {
        this.allergies = allergies
        this.overlayService.updateOverlayState(false)
      }
    )
  }

}
