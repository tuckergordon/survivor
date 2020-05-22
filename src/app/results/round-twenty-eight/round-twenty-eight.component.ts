import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { Observable } from 'rxjs';
import { Player } from 'src/app/shared/models/survivor.model';

const ROUNDS = [
  { name: 'Hold Your Breath', winner: 'Julian' },
  { name: 'Staring Contest', winner: 'Hannah' },
  { name: '60 Seconds', winner: 'Tucker' },
  { name: 'Wallsit', winner: 'Julian' },
  { name: 'Sporcle', winner: 'Tucker' },
  { name: 'Chug', winner: 'Julian' }
];

@Component({
  selector: 'app-round-twenty-eight',
  templateUrl: './round-twenty-eight.component.html',
  styleUrls: ['./round-twenty-eight.component.scss']
})
export class RoundTwentyEightComponent implements OnInit {
  players$: Observable<Player[]>;
  eliminated$: Observable<Player[]>;

  displayedColumns: string[] = ['Round', 'Hannah', 'Joe', 'Julian', 'Tucker'];
  roundData = ROUNDS.map(round => {
    this.displayedColumns.forEach(player => {
      if (player === 'Round') return;
      round[player] = round.winner === player;
    });
    return round;
  });

  readonly ROUND = 28;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.players$ = this.dataService.getPlayers({ round: this.ROUND });
    this.eliminated$ = this.dataService.getRoundEliminated(this.ROUND);
  }
}
