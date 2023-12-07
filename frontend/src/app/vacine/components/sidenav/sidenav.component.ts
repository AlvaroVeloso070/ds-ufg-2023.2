import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LogoComponent} from "../logo/logo.component";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {navBarItems} from "./navBarItems";
import {RouterLink} from "@angular/router";
import {faCircleUser, faClose, faSignOutAlt, faUser} from "@fortawesome/free-solid-svg-icons";
import {LoginService} from "../../core/services/login/login.service";
import User from "../../core/entities/User";

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, LogoComponent, FaIconComponent, RouterLink],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.sass'
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
