import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotFoundComponent} from './not-found/not-found.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {RouterModule} from "@angular/router";
import {HospitalsComponent} from './hospitals/hospitals.component';
import {HeaderComponent} from './header/header.component';
import {NothingSelectedComponent} from './nothing-selected/nothing-selected.component';
import {HttpClientModule} from "@angular/common/http";
import {UserDataComponent} from './user-data/user-data.component';
import {SpecialityInfoComponent} from './speciality-info/speciality-info.component';
import {UiElementsModule} from "../ui-elements/ui-elements.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IntegrationModule} from "../integration/integration.module";
import {AppModule} from "../app.module";


@NgModule({
  declarations: [
    NotFoundComponent,
    HospitalsComponent,
    HeaderComponent,
    NothingSelectedComponent,
    UserDataComponent,
    SpecialityInfoComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    UiElementsModule,
    FormsModule,
    IntegrationModule,
  ],
  exports: [
    HospitalsComponent,
    HeaderComponent,
    UserDataComponent,
    SpecialityInfoComponent
  ]
})
export class SharedModule {
}
