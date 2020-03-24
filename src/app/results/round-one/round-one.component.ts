import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { map } from 'rxjs/operators';
import { TribeTotal } from 'src/app/shared/models/survivor.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-round-one',
  templateUrl: './round-one.component.html',
  styleUrls: ['./round-one.component.scss']
})
export class RoundOneComponent implements OnInit {
  totals$: Observable<TribeTotal[]>;
  resultRows$: Observable<Array<[TribeTotal, TribeTotal]>>;
  max$: Observable<number>;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.totals$ = this.dataService.getRoundTotals(1);
    this.max$ = this.totals$.pipe(
      map(totals => {
        let max = 0;
        totals.forEach(total => {
          total.players.forEach(player => {
            if (player['round1'] > max) {
              max = player['round1'];
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