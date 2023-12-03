import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-primary-btn',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './primary-btn.component.html',
  styleUrl: './primary-btn.component.sass'
})
export class PrimaryBtnComponent {

  @Input()
  label!: string;

  @Input()
  onClick!: () => any;

  onClickHandler() : void{
    if (this.onClick){
      this.onClick();
    }
  }

}
