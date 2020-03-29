import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TribeTotal, Player } from 'src/app/shared/models/survivor.model';
import { map } from 'rxjs/operators';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-round-six',
  templateUrl: './round-six.component.html',
  styleUrls: ['./round-six.component.scss']
})
export class RoundSixComponent implements OnInit {
  totals$: Observable<TribeTotal[]>;
  resultRows$: Observable<Array<[TribeTotal, TribeTotal]>>;
  players$: Observable<Player[]>;
  eliminated$: Observable<Player[]>;

  readonly ROUND = 6;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.totals$ = this.dataService.getRoundTotalsByTribe(this.ROUND).pipe(map(totals => {
      totals.forEach(total => {
        total.total /= total.players.filter(player => !player.eliminated && player['round' + this.ROUND]).length;  // take the mean
      });
      return totals.sort((a, b) => a.total - b.total);
    }));
    this.players$ = this.dataService.getPlayers().pipe(
      map(players => players.filter(player => 'round' + this.ROUND in player))
    );
    this.eliminated$ = this.dataService.getRoundEliminated(this.ROUND);
    this.resultRows$ = this.totals$.pipe(
      map(totals => {
        const rows = [] as Array<[TribeTotal, TribeTotal]>;
        for (let i = 0; i < totals.length - 1; i += 2) {
          rows.push([totals[i], totals[i + 1]]);
        }
        return rows;
      })
    );
  }

}
