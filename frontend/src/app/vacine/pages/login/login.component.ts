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
  loginRequest : boolean = false

  constructor(private router: Router,
              private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.loginFormGroup = this.loginService.getFormGroup();
  }

  doLogin():void{
    if (this.loginFormGroup.valid){
      this.loginRequest = true
      this.loginService.doLogin(this.loginFormGroup.value);
    }
  }

  esqueciMinhaSenha(){
    this.router.navigate(['/vacine/forgot-password']);
  }

  createAccount() {
    this.router.navigate(['/vacine/signup']);
  }

  protected readonly faUser = faUser;

  protected readonly faLock = faLock;
}
