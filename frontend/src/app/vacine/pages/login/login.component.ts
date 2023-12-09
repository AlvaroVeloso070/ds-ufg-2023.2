import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LogoComponent} from "../../components/logo/logo.component";
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faUser} from "@fortawesome/free-regular-svg-icons";
import {faLock} from "@fortawesome/free-solid-svg-icons";
import {PrimaryBtnComponent} from "../../components/primary-btn/primary-btn.component";
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoginService} from "../../core/services/login/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, LogoComponent, FaIconComponent, PrimaryBtnComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass'
})
export class LoginComponent implements OnInit{

  loginFormGroup!: FormGroup;

  constructor(private router: Router,
              private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.loginFormGroup = this.loginService.getFormGroup();
  }

  doLogin():void{
    if (this.loginFormGroup.valid){
      this.loginService.doLogin(this.loginFormGroup.value);
    }
  }

  esqueciMinhaSenha(){
    this.router.navigate(['/forgot-password']);
  }

  protected readonly faUser = faUser;
  protected readonly faLock = faLock;
}
