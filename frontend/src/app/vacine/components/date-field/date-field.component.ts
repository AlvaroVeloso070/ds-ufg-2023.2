import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CalendarModule} from "primeng/calendar";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-date-field',
  standalone: true,
  imports: [CommonModule, CalendarModule, FormsModule],
  templateUrl: './date-field.component.html',
  styleUrl: './date-field.component.sass'
})
export class DateFieldComponent {

  @Input() model!: Date;
  @Input() label: string = '';
  @Input() id: string = '';

  @Output() modelChange: EventEmitter<Date> = new EventEmitter<Date>();
}
