import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {LoginComponent} from "./vacine/pages/login/login.component";
import {HomeComponent} from "./vacine/pages/home/home.component";
import {ForgotPasswordComponent} from "./vacine/pages/forgot-password/forgot-password.component";

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: '', component: HomeComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
