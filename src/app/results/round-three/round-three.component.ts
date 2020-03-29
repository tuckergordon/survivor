import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TribeTotal, Player } from 'src/app/shared/models/survivor.model';
import { DataService } from 'src/app/shared/services/data.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-round-three',
  templateUrl: './round-three.component.html',
  styleUrls: ['./round-three.component.scss']
})
export class RoundThreeComponent implements OnInit {
  totals$: Observable<TribeTotal[]>;
  resultRows$: Observable<Array<[TribeTotal, TribeTotal]>>;
  max$: Observable<number>;
  eliminated$: Observable<Player[]>;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.totals$ = this.dataService.getRoundTotalsByTribe(3).pipe(map(totals => {
      totals.forEach(total => {
        total.total /= total.players.length;  // take the mean
      });
      return totals;
    }));
    this.eliminated$ = this.dataService.getRoundEliminated(3);
    this.max$ = this.totals$.pipe(
      map(totals => {
        let max = 0;
        totals.forEach(total => {
          total.players.forEach(player => {
            if (player['round3'] > max) {
              max = player['round3'];
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
