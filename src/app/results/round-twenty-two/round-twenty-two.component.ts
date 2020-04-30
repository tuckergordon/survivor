import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from 'src/app/shared/models/survivor.model';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-round-twenty-two',
  templateUrl: './round-twenty-two.component.html',
  styleUrls: ['./round-twenty-two.component.scss']
})
export class RoundTwentyTwoComponent implements OnInit {
  players$: Observable<Player[]>;
  eliminated$: Observable<Player[]>;

  readonly ROUND = 22;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.players$ = this.dataService.getPlayers({ round: this.ROUND });
    this.eliminated$ = this.dataService.getRoundEliminated(this.ROUND);
  }
}
