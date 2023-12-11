import {Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginService} from "../../core/services/login/login.service";
import {faLock, faUser} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-login',
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
    this.router.navigate(['/vacine/forgot-password']);
  }

  protected readonly faUser = faUser;
  protected readonly faLock = faLock;
}
