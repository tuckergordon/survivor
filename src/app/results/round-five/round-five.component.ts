import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TribeTotal, Player } from 'src/app/shared/models/survivor.model';
import { DataService } from 'src/app/shared/services/data.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-round-five',
  templateUrl: './round-five.component.html',
  styleUrls: ['./round-five.component.scss']
})
export class RoundFiveComponent implements OnInit {
  totals$: Observable<TribeTotal[]>;
  resultRows$: Observable<Array<[TribeTotal, TribeTotal]>>;
  max$: Observable<number>;
  eliminated$: Observable<Player[]>;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.totals$ = this.dataService.getRoundTotals(4).pipe(map(totals => {
      totals.forEach(total => {
        total.total /= total.players.filter(player => !player.eliminated && player['round5']).length;  // take the mean
      });
      return totals;
    }));
    this.eliminated$ = this.dataService.getRoundEliminated(4);
    this.max$ = this.totals$.pipe(
      map(totals => {
        let max = 0;
        totals.forEach(total => {
          total.players.forEach(player => {
            if (player['round5'] > max) {
              max = player['round5'];
            }
          });
        });
        return max;
      })
    );
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
