import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from "./shared/not-found/not-found.component";

const routes: Routes = [
    {
      path: 'public',
      loadChildren: () => import('./public/public.module').then(m => m.PublicModule)
    },
    {
      path: 'secure',
      loadChildren: () => import('./secure/secure.module').then(m => m.SecureModule)
    },
    {
      path: '', redirectTo: 'public', pathMatch: 'full'
    },
    {
      path: '**', component: NotFoundComponent, pathMatch: 'full'
    }
  ]
;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
