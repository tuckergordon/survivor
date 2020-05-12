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
import { RoundFourteenComponent } from './results/round-fourteen/round-fourteen.component';
import { RoundFifteenComponent } from './result/round-fifteen/round-fifteen.component';
import { RoundSixteenComponent } from './results/round-sixteen/round-sixteen.component';
import { RoundSeventeenComponent } from './results/round-seventeen/round-seventeen.component';
import { RoundEighteenComponent } from './results/round-eighteen/round-eighteen.component';
import { RoundNineteenComponent } from './results/round-nineteen/round-nineteen.component';
import { RoundTwentyComponent } from './results/round-twenty/round-twenty.component';
import { RoundTwentyOneComponent } from './results/round-twenty-one/round-twenty-one.component';
import { RoundTwentyTwoComponent } from './results/round-twenty-two/round-twenty-two.component';
import { RoundTwentyThreeComponent } from './results/round-twenty-three/round-twenty-three.component';
import { RoundTwentyFourComponent } from './results/round-twenty-four/round-twenty-four.component';
import { RoundTwentyFiveComponent } from './results/round-twenty-five/round-twenty-five.component';
import { RoundTwentySixComponent } from './results/round-twenty-six/round-twenty-six.component';
import { RoundTwentySevenComponent } from './results/round-twenty-seven/round-twenty-seven.component';

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
      {
        path: '14',
        component: RoundFourteenComponent,
      },
      {
        path: '15',
        component: RoundFifteenComponent,
      },
      {
        path: '16',
        component: RoundSixteenComponent,
      },
      {
        path: '17',
        component: RoundSeventeenComponent,
      },
      {
        path: '18',
        component: RoundEighteenComponent,
      },
      {
        path: '19',
        component: RoundNineteenComponent,
      },
      {
        path: '20',
        component: RoundTwentyComponent,
      },
      {
        path: '21',
        component: RoundTwentyOneComponent,
      },
      {
        path: '22',
        component: RoundTwentyTwoComponent,
      },
      {
        path: '23',
        component: RoundTwentyThreeComponent,
      },
      {
        path: '24',
        component: RoundTwentyFourComponent,
      },
      {
        path: '25',
        component: RoundTwentyFiveComponent,
      },
      {
        path: '26',
        component: RoundTwentySixComponent,
      },
      {
        path: '27',
        component: RoundTwentySevenComponent,
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
