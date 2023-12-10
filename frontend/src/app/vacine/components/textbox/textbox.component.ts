import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputTextModule} from "primeng/inputtext";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputMaskModule} from "primeng/inputmask";

@Component({
  selector: 'app-textbox',
  standalone: true,
  imports: [CommonModule, InputTextModule, FormsModule, ReactiveFormsModule, InputMaskModule],
  templateUrl: './textbox.component.html',
  styleUrl: './textbox.component.sass'
})
export class TextboxComponent {

  @Input() model!: string;
  @Input() label: string = '';
  @Input() id: string = '';
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() required: boolean = false;
  @Input() mask!: string;

  @Output() modelChange: EventEmitter<string> = new EventEmitter<string>();


}
