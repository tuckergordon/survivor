import { Component, OnInit, Input } from '@angular/core';
import { TribeRound } from '../shared/models/survivor.model';

@Component({
  selector: 'app-total-card',
  templateUrl: './total-card.component.html',
  styleUrls: ['./total-card.component.scss']
})
export class TotalCardComponent implements OnInit {

  @Input() tribeRound: TribeRound;
  @Input() round?: number;

  constructor() { }

  ngOnInit(): void {
  }

}
