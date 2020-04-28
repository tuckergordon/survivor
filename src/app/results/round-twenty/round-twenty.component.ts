import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Player, Round, Tribe } from 'src/app/shared/models/survivor.model';
import { DataService, AggregateBy, SortBy } from 'src/app/shared/services/data.service';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-round-twenty',
  templateUrl: './round-twenty.component.html',
  styleUrls: ['./round-twenty.component.scss']
})
export class RoundTwentyComponent implements OnInit {
  players$: Observable<Player[]>;
  eliminated$: Observable<Player[]>;

  displayedColumns: string[] = ['name', 'score', 'tiebreak'];

  readonly ROUND = 20;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.players$ = this.dataService.getPlayers({ round: this.ROUND })
      .pipe(
        map(players => players.sort((a, b) => {
          const aScore = this.getPlayerScore(a);
          const bScore = this.getPlayerScore(b);
          if (aScore === bScore) {
            return this.getPlayerTiebreak(b) - this.getPlayerTiebreak(a);
          }
          if (isNaN(aScore)) return -1;
          if (isNaN(bScore)) return 1;
          return bScore - aScore;
        }))
      );
    this.eliminated$ = this.dataService.getRoundEliminated(this.ROUND);  // TODO: implement eliminated in refactor
  }

  getPlayerTribe(player: Player): Tribe {
    return DataService.getPlayerTribe(player, this.ROUND);
  }

  getPlayerScore(player: Player): number {
    return DataService.getPlayerScore(player, this.ROUND);
  }

  getPlayerTiebreak(player: Player) {
    return player['round' + this.ROUND + 'Tiebreak'];
  }
}
