import {Component, } from '@angular/core';
import {OverlayService} from "../../core/services/overlay/overlay.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass'
})
export class HomeComponent{
  loadRequest : boolean = false

  constructor(private service : OverlayService) {
    this.service.overlayState$.subscribe(state => this.loadRequest = state)
  }


}
