import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SecureRoutingModule} from './secure-routing.module';
import {SecureComponent} from './secure.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { PatientsComponent } from './patients/patients.component';
import { SpecialitiesComponent } from './specialities/specialities.component';
import {FormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {SharedModule} from "../shared/shared.module";
import {UiElementsModule} from "../ui-elements/ui-elements.module";
import {IntegrationModule} from "../integration/integration.module";


@NgModule({
  declarations: [
    SecureComponent,
    DoctorsComponent,
    PatientsComponent,
    SpecialitiesComponent,
  ],
  imports: [
    CommonModule,
    SecureRoutingModule,
    FormsModule,
    FontAwesomeModule,
    SharedModule,
    UiElementsModule,
    IntegrationModule
  ]
})
export class SecureModule {
}
