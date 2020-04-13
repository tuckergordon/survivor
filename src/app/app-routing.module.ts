import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RosterComponent } from './roster/roster.component';
import { RoundOneComponent } from './results/round-one/round-one.component';
import { RoundTwoComponent } from './results/round-two/round-two.component';
import { RoundThreeComponent } from './results/round-three/round-three.component';
import { RoundFourComponent } from './results/round-four/round-four.component';
import { RoundFiveComponent } from './results/round-five/round-five.component';
import { RoundSixComponent } from './results/round-six/round-six.component';
import { RoundSevenComponent } from './results/round-seven/round-seven.component';
import { RoundEightComponent } from './results/round-eight/round-eight.component';
import { RoundNineComponent } from './results/round-nine/round-nine.component';
import { RoundTenComponent } from './results/round-ten/round-ten.component';
import { RoundElevenComponent } from './results/round-eleven/round-eleven.component';
import { RoundTwelveComponent } from './results/round-twelve/round-twelve.component';
import { RoundThirteenComponent } from './results/round-thirteen/round-thirteen.component';

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
      {
        path: '5',
        component: RoundFiveComponent,
      },
      {
        path: '6',
        component: RoundSixComponent,
      },
      {
        path: '7',
        component: RoundSevenComponent,
      },
      {
        path: '8',
        component: RoundEightComponent,
      },
      {
        path: '9',
        component: RoundNineComponent,
      },
      {
        path: '10',
        component: RoundTenComponent,
      },
      {
        path: '11',
        component: RoundElevenComponent,
      },
      {
        path: '12',
        component: RoundTwelveComponent,
      },
      {
        path: '13',
        component: RoundThirteenComponent,
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
