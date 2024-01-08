import {Component, OnInit} from '@angular/core';
import Allergy from "../../core/entities/Allergy";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.sass'
})
export class DeleteDialogComponent implements OnInit{
  allergy !: Allergy

  constructor(public ref : DynamicDialogRef, public config : DynamicDialogConfig) {
  }

  ngOnInit() {
    this.allergy = this.config.data.allergy
  }

  close(){
    this.ref.close()
  }

  delete(){

  }
}
