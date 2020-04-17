import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Player, Round, Tribe } from 'src/app/shared/models/survivor.model';
import { DataService, AggregateBy, SortBy } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-round-fifteen',
  templateUrl: './round-fifteen.component.html',
  styleUrls: ['./round-fifteen.component.scss']
})
export class RoundFifteenComponent implements OnInit {
  players$: Observable<Player[]>;
  tribeScores$: Observable<Round[]>;
  eliminated$: Observable<Player[]>;

  readonly ROUND = 15;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.tribeScores$ = this.dataService.getTribeScores(this.ROUND, AggregateBy.AVG, SortBy.ASC);
    this.players$ = this.dataService.getPlayers({ round: this.ROUND });
    this.eliminated$ = this.dataService.getRoundEliminated(this.ROUND);  // TODO: implement eliminated in refactor
  }

  getPlayerTribe(player: Player): Tribe {
    return DataService.getPlayerTribe(player, this.ROUND);
  }
}
