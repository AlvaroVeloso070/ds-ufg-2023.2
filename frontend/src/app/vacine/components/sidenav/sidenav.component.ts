import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LogoComponent} from "../logo/logo.component";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {navBarItems} from "./navBarItems";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {faCircleUser, faClose, faSignOutAlt, faUser} from "@fortawesome/free-solid-svg-icons";
import {LoginService} from "../../core/services/login/login.service";
import User from "../../core/entities/User";
import {animate, keyframes, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, LogoComponent, FaIconComponent, RouterLink, RouterLinkActive],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.sass',
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

  usuarioLogado!: User;
  ngOnInit(): void {
    this.usuarioLogado = LoginService.getUsuarioLogado();
  }

  collapsed: boolean = true;

  sideNavItems = navBarItems;

  protected readonly faClose = faClose;
  protected readonly faSignOutAlt = faSignOutAlt;

  logout() {
    LoginService.logout();
  }

  protected readonly faUser = faUser;
  protected readonly faCircleUser = faCircleUser;
}
