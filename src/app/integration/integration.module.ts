import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HospitalService} from "./services/hospital.service";
import {HospitalFilterPipe} from './pipes/hospital-filter.pipe';
import {DoctorFilterPipe} from './pipes/doctor-filter.pipe';
import {PatientFilterPipe} from "./pipes/patient-filter.pipe";


@NgModule({
  declarations: [
    HospitalFilterPipe,
    DoctorFilterPipe,
    PatientFilterPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HospitalFilterPipe,
    DoctorFilterPipe,
    PatientFilterPipe
  ],
  providers: [
    HospitalService
  ]
})
export class IntegrationModule {
}
