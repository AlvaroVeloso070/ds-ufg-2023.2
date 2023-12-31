import {Component, OnInit} from '@angular/core';
import {faCircleUser, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import {animate, keyframes, style, transition, trigger} from "@angular/animations";
import {navBarItems} from "./navBarItems";
import {LoginService} from "../../vacine/core/services/login/login.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.sass',
  providers: [MessageService],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({opacity: 0}),
        animate('350ms',
          style({opacity: 1})
        )
      ]),
      transition(':leave', [
        style({opacity: 1}),
        animate('350ms',
          style({opacity: 0})
        )
      ])
    ]),
    trigger('rotate', [
      transition(':enter', [
        animate('1000ms',
          keyframes([
            style({transform: 'rotate(0deg)', offset: '0'}),
            style({transform: 'rotate(2turn)', offset: '1'})
          ])
        )
      ])
    ])
  ]
})
export class SidenavComponent implements OnInit{

  usuarioLogado!: any;

  constructor(private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.usuarioLogado = this.loginService.getUsuarioLogado();
  }

  sideNavItems = navBarItems;

  logout() {
    this.loginService.logout();
  }

  protected readonly faCircleUser = faCircleUser;
  protected readonly faSignOutAlt = faSignOutAlt;
}
