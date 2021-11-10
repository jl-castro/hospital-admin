import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TagNameComponent} from './tag-name/tag-name.component';
import {ShowContentButtonComponent} from './show-content-button/show-content-button.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {TagUserDataComponent} from './tag-user-data/tag-user-data.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HospitalButtonComponent } from './hospital-button/hospital-button.component';
import { HospitalCreateFormComponent } from './hospital-create-form/hospital-create-form.component';
import { HospitalEditFormComponent } from './hospital-edit-form/hospital-edit-form.component';
import { DoctorEditFormComponent } from './doctor-edit-form/doctor-edit-form.component';
import { DoctorCreateFormComponent } from './doctor-create-form/doctor-create-form.component';
import { PatientCreateFormComponent } from './patient-create-form/patient-create-form.component';


@NgModule({
  declarations: [
    TagNameComponent,
    ShowContentButtonComponent,
    TagUserDataComponent,
    HospitalButtonComponent,
    HospitalCreateFormComponent,
    HospitalEditFormComponent,
    DoctorEditFormComponent,
    DoctorCreateFormComponent,
    PatientCreateFormComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    TagNameComponent,
    ShowContentButtonComponent,
    TagUserDataComponent,
    HospitalButtonComponent,
    HospitalCreateFormComponent,
    HospitalEditFormComponent,
    DoctorCreateFormComponent,
    PatientCreateFormComponent,
  ]
})
export class UiElementsModule {
}
