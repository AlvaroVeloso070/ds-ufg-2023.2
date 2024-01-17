import {Component, OnInit} from '@angular/core';
import {AgendaService} from "../../core/services/agenda/agenda.service";
import {VacinaService} from "../../core/services/vaccine/vacina.service";
import Vacina from "../../core/entities/Vacina";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.component.html',
  styleUrl: './new-appointment.component.sass'
})
export class NewAppointmentComponent implements OnInit{

  public vacinas : Vacina[] = []
  public formGroup !: FormGroup;
  constructor(private agendaService: AgendaService, private vacinaService : VacinaService) {

  }

  ngOnInit(): void {
    this.formGroup = this.agendaService.getFormGroup()

    this.formGroup.get('usuarioId')?.setValue(this.agendaService.getPacienteId())

    this.vacinaService.getVacinas().subscribe((vacinas:Vacina[]) => {
      this.vacinas = vacinas
    });
  }

  submeter() {
    this.agendaService.incluirAgendamento(this.formGroup);
  }
}
