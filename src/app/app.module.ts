import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { AppComponent } from './app.component';
import { RosterComponent } from './roster/roster.component';
import { RosterCardComponent } from './roster/roster-card/roster-card.component';
import { RoundOneComponent } from './results/round-one/round-one.component';
import { TotalCardComponent } from './total-card/total-card.component';
import { MinuteSecondsPipe } from './shared/pipes/minute-seconds.pipe';
import { ResultRowComponent } from './results/result-row/result-row.component';
import { WinLossChartComponent } from './win-loss-chart/win-loss-chart.component';
import { RoundTwoComponent } from './results/round-two/round-two.component';
import { RoundThreeComponent } from './results/round-three/round-three.component';
import { RoundFourComponent } from './results/round-four/round-four.component';
import { RoundFiveComponent } from './results/round-five/round-five.component';
import { ScoreBarChartComponent } from './score-bar-chart/score-bar-chart.component';
// import { ClockChartComponent } from './clock-chart/clock-chart.component';
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
import { WikiPathsComponent } from './wiki-paths/wiki-paths.component';
import { RoundNineteenComponent } from './results/round-nineteen/round-nineteen.component';
import { RoundTwentyComponent } from './results/round-twenty/round-twenty.component';
import { RoundTwentyOneComponent } from './results/round-twenty-one/round-twenty-one.component';
import { RoundTwentyTwoComponent } from './results/round-twenty-two/round-twenty-two.component';
import { RoundTwentyThreeComponent } from './results/round-twenty-three/round-twenty-three.component';
import { RoundTwentyFourComponent } from './results/round-twenty-four/round-twenty-four.component';
import { CupPongBracketComponent } from './results/round-twenty-four/cup-pong-bracket/cup-pong-bracket.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RosterComponent,
    RosterCardComponent,
    RoundOneComponent,
    TotalCardComponent,
    MinuteSecondsPipe,
    ResultRowComponent,
    WinLossChartComponent,
    RoundTwoComponent,
    RoundThreeComponent,
    RoundFourComponent,
    RoundFiveComponent,
    ScoreBarChartComponent,
    // ClockChartComponent,
    RoundSixComponent,
    RoundSevenComponent,
    RoundEightComponent,
    RoundNineComponent,
    RoundTenComponent,
    RoundElevenComponent,
    RoundTwelveComponent,
    RoundThirteenComponent,
    RoundFourteenComponent,
    RoundFifteenComponent,
    RoundSixteenComponent,
    RoundSeventeenComponent,
    RoundEighteenComponent,
    WikiPathsComponent,
    RoundNineteenComponent,
    RoundTwentyComponent,
    RoundTwentyOneComponent,
    RoundTwentyTwoComponent,
    RoundTwentyThreeComponent,
    RoundTwentyFourComponent,
    CupPongBracketComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatTableModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
