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
    ScoreBarChartComponent
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
