import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.sass'
})
export class LogoComponent {

  @Input() justIcon!: boolean;
  @Input() hideText: boolean = false;
}
