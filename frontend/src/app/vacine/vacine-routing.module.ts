import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {VacineComponent} from './vacine.component';
import {LoginComponent} from "./pages/login/login.component";
import {ForgotPasswordComponent} from "./pages/forgot-password/forgot-password.component";
import {HomeComponent} from "./pages/home/home.component";
import {AppointmentsComponent} from "./pages/appointments/appointments.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {NewAppointmentComponent} from "./pages/new-appointment/new-appointment.component";
import {SignupComponent} from "./pages/signup/signup.component";
import {VaccinesComponent} from "./pages/vaccines/vaccines.component";
import {NewVaccineComponent} from "./pages/new-vaccine/new-vaccine.component";
import {AllergiesComponent} from "./pages/allergies/allergies.component";
import {NewAllergyComponent} from "./pages/new-allergy/new-allergy.component";

const routes: Routes = [{ path: '', component: VacineComponent, children: [
  {path: 'login', component: LoginComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'home', component: HomeComponent,
    children:[
      {path: 'appointments', component: AppointmentsComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'appointment/new', component: NewAppointmentComponent},
      {path: 'vaccine', component: VaccinesComponent},
      {path: 'vaccine/new', component: NewVaccineComponent},
      {path: 'allergy', component: AllergiesComponent},
      {path: 'allergy/new', component: NewAllergyComponent},
    ]},
  {path: '**', redirectTo: 'login'}
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VacineRoutingModule { }
