import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RootComponent } from '../Root/root.component';

const routes: Routes = [
  {
    path: 'root',
    component: RootComponent,
    loadChildren: () => import('../Root/Root-routing.module').then(m => m.RootRoutingModule),

  },
  { path: '', loadChildren: () => import('../Auth/auth.module').then(m => m.AuthModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
