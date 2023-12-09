import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PasswordModule} from "primeng/password";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-password-field',
  standalone: true,
  imports: [CommonModule, PasswordModule, FormsModule],
  templateUrl: './password-field.component.html',
  styleUrl: './password-field.component.sass'
})
export class PasswordFieldComponent {
  @Input() model!: string;
  @Input() label: string = '';
  @Input() id: string = '';

  @Output() modelChange: EventEmitter<string> = new EventEmitter<string>();
}
