import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {SidenavComponent} from "../../components/sidenav/sidenav.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SidenavComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass'
})
export class HomeComponent {

}
