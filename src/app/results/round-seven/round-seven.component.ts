import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TribeTotal, Player } from 'src/app/shared/models/survivor.model';
import { DataService } from 'src/app/shared/services/data.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-round-seven',
  templateUrl: './round-seven.component.html',
  styleUrls: ['./round-seven.component.scss']
})
export class RoundSevenComponent implements OnInit {
  totals$: Observable<TribeTotal[]>;
  players$: Observable<Player[]>;
  eliminated$: Observable<Player[]>;

  readonly ROUND = 7;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.totals$ = this.dataService.getRoundTotalsByTribe(this.ROUND).pipe(map(totals => {
      totals.forEach(total => {
        total.total /= total.players.filter(player => {
          const score = player['round' + this.ROUND];
          return !!score || score === 0;
        }).length;  // take the mean
      });
      return totals.sort((a, b) => a.total - b.total);
    }));
    this.players$ = this.dataService.getPlayers().pipe(
      map(players => players.filter(player => {
        const score = player['round' + this.ROUND];
        return !!score || score === 0;
      }))
    );
    this.eliminated$ = this.dataService.getRoundEliminated(this.ROUND);
  }

}
