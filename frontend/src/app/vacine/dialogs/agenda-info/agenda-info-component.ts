import {Component, OnInit} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import Agenda from "../../core/entities/agenda";

@Component({
  selector: 'app-agenda-info',
  templateUrl: './agenda-info-component.html',
  styleUrl: './agenda-info-component.sass'
})
export class AgendaInfoComponent implements OnInit{
  constructor(public ref: DynamicDialogRef, public config : DynamicDialogConfig) {
    console.log(this.config.data)
  }

  agenda !: Agenda
  dateText !: string

  ngOnInit() {
    this.agenda = this.config.data.agenda
    this.dateText = this.agenda.data.toLocaleString()

    this.ref = this.config.data.ref
  }

}
