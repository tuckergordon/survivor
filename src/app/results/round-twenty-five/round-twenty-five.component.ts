import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from 'src/app/shared/models/survivor.model';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-round-twenty-five',
  templateUrl: './round-twenty-five.component.html',
  styleUrls: ['./round-twenty-five.component.scss']
})
export class RoundTwentyFiveComponent implements OnInit {
  eliminated$: Observable<Player[]>;

  readonly ROUND = 25;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.eliminated$ = this.dataService.getRoundEliminated(this.ROUND);
  }
}
