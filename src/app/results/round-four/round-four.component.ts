import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { Observable } from 'rxjs';
import { TribeTotal, Player } from 'src/app/shared/models/survivor.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-round-four',
  templateUrl: './round-four.component.html',
  styleUrls: ['./round-four.component.scss']
})
export class RoundFourComponent implements OnInit {
  totals$: Observable<TribeTotal[]>;
  resultRows$: Observable<Array<[TribeTotal, TribeTotal]>>;
  max$: Observable<number>;
  eliminated$: Observable<Player[]>;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.totals$ = this.dataService.getRoundTotals(4).pipe(map(totals => {
      totals.forEach(total => {
        total.total /= total.players.filter(player => !player.eliminated).length;  // take the mean
      });
      return totals;
    }));
    this.eliminated$ = this.dataService.getRoundEliminated(4);
    this.max$ = this.totals$.pipe(
      map(totals => {
        let max = 0;
        totals.forEach(total => {
          total.players.forEach(player => {
            if (player['round4'] > max) {
              max = player['round4'];
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
