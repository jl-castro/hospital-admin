import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from "./shared/not-found/not-found.component";
import {NothingSelectedComponent} from "./shared/nothing-selected/nothing-selected.component";

const routes: Routes = [
    {
      path: '', component: NothingSelectedComponent
    },
    {
      path: 'secure/:id',
      loadChildren: () => import('./secure/secure.module').then(m => m.SecureModule)
    },
    {
      path: '**', component: NotFoundComponent, pathMatch: 'full'
    },
  ]
;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
