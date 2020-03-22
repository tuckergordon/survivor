import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RosterComponent } from './roster/roster.component';
import { RoundOneComponent } from './results/round-one/round-one.component';

const routes: Routes = [
  {
    path: 'tribes',
    component: RosterComponent,
  },
  {
    path: 'results',
    component: RoundOneComponent,
    children: [
      {
        path: '1',
        component: RoundOneComponent,
      }
    ]
  },
  { path: '',
    redirectTo: '/tribes',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
