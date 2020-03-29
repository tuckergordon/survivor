import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { map } from 'rxjs/operators';
import { TribeTotal, Player } from 'src/app/shared/models/survivor.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-round-two',
  templateUrl: './round-two.component.html',
  styleUrls: ['./round-two.component.scss']
})
export class RoundTwoComponent implements OnInit {
  totals$: Observable<TribeTotal[]>;
  resultRows$: Observable<Array<[TribeTotal, TribeTotal]>>;
  max$: Observable<number>;
  eliminated$: Observable<Player[]>;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.totals$ = this.dataService.getRoundTotalsByTribe(2).pipe(map(totals => {
      totals.forEach(total => {
        total.total /= total.players.filter(player => !player.eliminated).length;  // take the mean
      });
      return totals;
    }));
    this.eliminated$ = this.dataService.getRoundEliminated(2);
    this.max$ = this.totals$.pipe(
      map(totals => {
        let max = 0;
        totals.forEach(total => {
          total.players.forEach(player => {
            if (player['round2'] > max) {
              max = player['round2'];
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
