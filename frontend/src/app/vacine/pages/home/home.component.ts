import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidenavComponent} from "../../components/sidenav/sidenav.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SidenavComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass'
})
export class HomeComponent {

}
