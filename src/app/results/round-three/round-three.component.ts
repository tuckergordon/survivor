import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { Player, TribeRound, Tribe } from 'src/app/shared/models/survivor.model';
import { DataService, AggregateBy, SortBy } from 'src/app/shared/services/data.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-round-three',
  templateUrl: './round-three.component.html',
  styleUrls: ['./round-three.component.scss']
})
export class RoundThreeComponent implements OnInit {
  resultRows$: Observable<Array<[TribeRound, TribeRound]>>;
  max$: Observable<number>;
  eliminated$: Observable<Player[]>;

  readonly ROUND = 3;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    const players$ = this.dataService.getPlayers({ round: this.ROUND });
    const tribeScores$ = this.dataService.getTribeScores(this.ROUND, AggregateBy.AVG, SortBy.DESC);
    this.resultRows$ = combineLatest([players$, tribeScores$]).pipe(map(([players, tribeScores]) => {
      tribeScores = tribeScores.sort((a, b) => a.tribe.id.localeCompare(b.tribe.id));
      const tribeScoreMap = {};
      tribeScores.forEach(tribeScore => {
        tribeScoreMap[tribeScore.tribe.id] = {
          ...tribeScore,
          players: []
        };
      });
      players.forEach(player => {
        const playerRound = DataService.getPlayerRound(player, this.ROUND);
        if (!playerRound.tribe || !(playerRound.tribe.id in tribeScoreMap) || !playerRound.score && playerRound.score !== 0) {
          return;
        }
        tribeScoreMap[playerRound.tribe.id].players.push(player);
      });
      const rows = [] as Array<[TribeRound, TribeRound]>;
      for (let i = 0; i < tribeScores.length - 1; i += 2) {
        const tribeA = tribeScores[i].tribe.id;
        const tribeB = tribeScores[i + 1].tribe.id;
        rows.push([tribeScoreMap[tribeA], tribeScoreMap[tribeB]]);
      }
      return rows;
    }));
    this.eliminated$ = this.dataService.getRoundEliminated(this.ROUND);
    this.max$ = players$.pipe(
      map(players => {
        let max = 0;
        players.forEach(player => {
          if (this.getPlayerScore(player) > max) {
            max = this.getPlayerScore(player);
          }
        });
        return max;
      })
    );
  }

  getPlayerScore(player: Player): number {
    return DataService.getPlayerRound(player, this.ROUND).score;
  }

  getPlayerTribe(player: Player): Tribe {
    return DataService.getPlayerTribe(player, this.ROUND);
  }
}
