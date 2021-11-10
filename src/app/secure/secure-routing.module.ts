import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SecureComponent} from "./secure.component";
import {DoctorsComponent} from "./doctors/doctors.component";
import {PatientsComponent} from "./patients/patients.component";
import {SpecialitiesComponent} from "./specialities/specialities.component";

const routes: Routes = [
  {
    path: '',
    component: SecureComponent,
    children: [
      {
        path: 'doctors', component: DoctorsComponent
      },
      {
        path: 'patients', component: PatientsComponent
      },
      {
        path: 'specialities', component: SpecialitiesComponent
      },
      {
        path: '', redirectTo: 'doctors'
      },
      {
        path: '**', redirectTo: '', pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecureRoutingModule {
}
