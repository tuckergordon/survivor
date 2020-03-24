import { Component, OnInit, Input } from '@angular/core';
import { TribeTotal } from 'src/app/shared/models/survivor.model';

@Component({
  selector: 'app-result-row',
  templateUrl: './result-row.component.html',
  styleUrls: ['./result-row.component.scss']
})
export class ResultRowComponent implements OnInit {

  @Input() totals: [TribeTotal, TribeTotal];
  @Input() round: number;
  @Input() resultUnit = 'Count';
  @Input() sortDirection: 'asc' | 'desc' = 'asc';
  @Input() max: number;

  displayedColumns: string[] = ['name', 'result'];
  winnerIndex: number;

  constructor() { }

  ngOnInit(): void {
    if (this.sortDirection === 'desc') {
      this.winnerIndex = this.totals[0] > this.totals[1] ? 0 : 1;
    } else {
      this.winnerIndex = this.totals[0] < this.totals[1] ? 0 : 1;
    }
  }

  // TODO: move to parent component
  sortTotal(total: TribeTotal) {
    total.players.sort((a, b) => {
      if (this.sortDirection === 'asc') {
        return a['round' + this.round] - b['round' + this.round]; // TODO: rounds
      }
      return b['round' + this.round] - a['round' + this.round]; // TODO: rounds
    });
    return total;
  }

}
