import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VacineComponent } from './vacine.component';
import {LoginComponent} from "./pages/login/login.component";
import {ForgotPasswordComponent} from "./pages/forgot-password/forgot-password.component";
import {HomeComponent} from "./pages/home/home.component";
import {AppointmentsComponent} from "./pages/appointments/appointments.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {NewAppointmentComponent} from "./pages/new-appointment/new-appointment.component";
import {SignupComponent} from "./pages/signup/signup.component";

const routes: Routes = [{ path: '', component: VacineComponent, children: [
  {path: 'login', component: LoginComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'home', component: HomeComponent,
    children:[
      {path: 'appointments', component: AppointmentsComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'appointment/new', component: NewAppointmentComponent},
    ]},
  {path: '**', redirectTo: 'login'}
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VacineRoutingModule { }
