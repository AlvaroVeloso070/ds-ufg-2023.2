import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {VacineRoutingModule} from './vacine-routing.module';
import {VacineComponent} from "./vacine.component";
import {ProfileComponent} from './pages/profile/profile.component';
import {SharedModule} from "../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoginComponent} from './pages/login/login.component';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {ForgotPasswordComponent} from './pages/forgot-password/forgot-password.component';
import {
  PasswordRecoveryConfirmationComponent
} from './dialogs/password-recovery-confirmation/password-recovery-confirmation.component';
import {AppointmentsComponent} from './pages/appointments/appointments.component';
import {NewAppointmentComponent} from './pages/new-appointment/new-appointment.component';
import {HomeComponent} from './pages/home/home.component';
import {TableModule} from "primeng/table";
import {SignupComponent} from './pages/signup/signup.component';
import {AgendaInfoComponent} from "./dialogs/agenda-info/agenda-info-component";
import {VaccinesComponent} from './pages/vaccines/vaccines.component';
import {NewVaccineComponent} from './pages/new-vaccine/new-vaccine.component';
import {AllergiesComponent} from './pages/allergies/allergies.component';
import {NewAllergyComponent} from './pages/new-allergy/new-allergy.component';
import {DeleteDialogComponent} from './dialogs/delete-dialog/delete-dialog.component';
import {ButtonModule} from "primeng/button";
import {AuthService} from "./core/services/login/auth.service";
import {HttpClientModule} from "@angular/common/http";
import {BlockUIModule} from "primeng/blockui";
import {ProgressSpinnerModule} from "primeng/progressspinner";


@NgModule({
  declarations: [
    VacineComponent,
    ProfileComponent,
    LoginComponent,
    ForgotPasswordComponent,
    PasswordRecoveryConfirmationComponent,
    AppointmentsComponent,
    NewAppointmentComponent,
    HomeComponent,
    AgendaInfoComponent,
    SignupComponent,
    VaccinesComponent,
    NewVaccineComponent,
    AllergiesComponent,
    NewAllergyComponent,
    DeleteDialogComponent
  ],
  imports: [
    CommonModule,
    VacineRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    FaIconComponent,
    TableModule,
    ButtonModule,
    HttpClientModule,
    BlockUIModule,
    ProgressSpinnerModule
  ],
  providers: [
    AuthService
  ]
})
export class VacineModule {
}
