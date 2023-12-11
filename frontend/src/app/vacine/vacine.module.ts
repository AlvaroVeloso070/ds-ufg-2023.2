import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VacineRoutingModule } from './vacine-routing.module';
import {VacineComponent} from "./vacine.component";
import { ProfileComponent } from './pages/profile/profile.component';
import {SharedModule} from "../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LoginComponent } from './pages/login/login.component';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { PasswordRecoveryConfirmationComponent } from './dialogs/password-recovery-confirmation/password-recovery-confirmation.component';
import { AppointmentsComponent } from './pages/appointments/appointments.component';
import { NewAppointmentComponent } from './pages/new-appointment/new-appointment.component';
import { HomeComponent } from './pages/home/home.component';
import {TableModule} from "primeng/table";


@NgModule({
  declarations: [
    VacineComponent,
    ProfileComponent,
    LoginComponent,
    ForgotPasswordComponent,
    PasswordRecoveryConfirmationComponent,
    AppointmentsComponent,
    NewAppointmentComponent,
    HomeComponent
  ],
    imports: [
        CommonModule,
        VacineRoutingModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        FaIconComponent,
        TableModule
    ]
})
export class VacineModule { }
