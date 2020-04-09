import { Component, OnInit, Input } from '@angular/core';
import { MinuteSecondsPipe } from 'src/app/shared/pipes/minute-seconds.pipe';
import { TribeRound, Player } from 'src/app/shared/models/survivor.model';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-result-row',
  templateUrl: './result-row.component.html',
  styleUrls: ['./result-row.component.scss'],
  providers: [MinuteSecondsPipe]
})
export class ResultRowComponent implements OnInit {

  @Input() tribeRounds: [TribeRound, TribeRound];
  @Input() round: number;
  @Input() resultUnit = 'Time';
  @Input() sortDirection: 'asc' | 'desc' = 'asc';
  @Input() max: number;

  displayedColumns: string[] = ['name', 'result'];
  winnerIndex: number;

  constructor(private minuteSecondsPipe: MinuteSecondsPipe) { }

  ngOnInit(): void {
    this.tribeRounds = this.tribeRounds.map(tribeRound => this.sortTotal(tribeRound)) as [TribeRound, TribeRound];
    if (this.sortDirection === 'desc') {
      this.winnerIndex = this.tribeRounds[0].score > this.tribeRounds[1].score ? 0 : 1;
    } else {
      this.winnerIndex = this.tribeRounds[0].score < this.tribeRounds[1].score ? 0 : 1;
    }
  }

  // TODO: move to parent component
  sortTotal(total: TribeRound) {
    total.players.sort((_a, _b) => {
      const a = this.getPlayerScore(_a);
      const b = this.getPlayerScore(_b);

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

  getPlayerScore(player: Player): number {
    return DataService.getPlayerScore(player, this.round);
  }

}
