import { Component, OnInit, Input } from '@angular/core';
import { TribeTotal } from 'src/app/shared/models/survivor.model';
import { MinuteSecondsPipe } from 'src/app/shared/pipes/minute-seconds.pipe';

@Component({
  selector: 'app-result-row',
  templateUrl: './result-row.component.html',
  styleUrls: ['./result-row.component.scss'],
  providers: [MinuteSecondsPipe]
})
export class ResultRowComponent implements OnInit {

  @Input() totals: [TribeTotal, TribeTotal];
  @Input() round: number;
  @Input() resultUnit = 'Time';
  @Input() sortDirection: 'asc' | 'desc' = 'asc';
  @Input() max: number;

  displayedColumns: string[] = ['name', 'result'];
  winnerIndex: number;

  constructor(private minuteSecondsPipe: MinuteSecondsPipe) { }

  ngOnInit(): void {
    if (this.sortDirection === 'desc') {
      this.winnerIndex = this.totals[0].total > this.totals[1].total ? 0 : 1;
    } else {
      this.winnerIndex = this.totals[0].total < this.totals[1].total ? 0 : 1;
    }
  }

  // TODO: move to parent component
  sortTotal(total: TribeTotal) {
    total.players.sort((_a, _b) => {
      const a = _a['round' + this.round];
      const b = _a['round' + this.round];

      if (this.sortDirection === 'asc') {
        return a - b; // TODO: rounds
      }
      return b - a; // TODO: rounds
    });
    return total;
  }

  getResult(result) {
    if (!result || result.eliminated) return '';
    if (this.resultUnit === 'Time') {
      return this.minuteSecondsPipe.transform(result);
    } else if (this.resultUnit === 'Pct') {
      return result + '%';
    }
    return result;
  }

}
