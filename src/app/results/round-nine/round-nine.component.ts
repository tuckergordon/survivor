import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TribeTotal, Player, Round } from 'src/app/shared/models/survivor.model';
import { DataService, AggregateBy, SortBy } from 'src/app/shared/services/data.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-round-nine',
  templateUrl: './round-nine.component.html',
  styleUrls: ['./round-nine.component.scss']
})
export class RoundNineComponent implements OnInit {
  players$: Observable<Player[]>;
  tribeScores$: Observable<Round[]>;
  // eliminated$: Observable<Player[]>;

  readonly ROUND = 9;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.tribeScores$ = this.dataService.getTribeScores(this.ROUND, AggregateBy.AVG, SortBy.DESC);
    this.players$ = this.dataService.getPlayers({ round: this.ROUND });
    // this.eliminated$ = this.dataService.getRoundEliminated(this.ROUND);  // TODO: implement eliminated in refactor
  }
}
