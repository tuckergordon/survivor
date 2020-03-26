import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RosterComponent } from './roster/roster.component';
import { RoundOneComponent } from './results/round-one/round-one.component';
import { RoundTwoComponent } from './results/round-two/round-two.component';
import { RoundThreeComponent } from './results/round-three/round-three.component';
import { RoundFourComponent } from './results/round-four/round-four.component';

const routes: Routes = [
  {
    path: 'tribes',
    component: RosterComponent,
  },
  {
    path: 'results',
    children: [
      {
        path: '1',
        component: RoundOneComponent,
      },
      {
        path: '2',
        component: RoundTwoComponent,
      },
      {
        path: '3',
        component: RoundThreeComponent,
      },
      {
        path: '4',
        component: RoundFourComponent,
      },
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
