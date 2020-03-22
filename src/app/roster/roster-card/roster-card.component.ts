import { Component, OnInit, Input } from '@angular/core';
import { Player } from 'src/app/shared/models/survivor.model';

@Component({
  selector: 'app-roster-card',
  templateUrl: './roster-card.component.html',
  styleUrls: ['./roster-card.component.scss']
})
export class RosterCardComponent implements OnInit {

  @Input() player: Player;

  constructor() { }

  ngOnInit(): void {
  }

}
