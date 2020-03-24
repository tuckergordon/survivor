import { Component, OnInit, Input } from '@angular/core';
import { TribeTotal } from '../shared/models/survivor.model';

@Component({
  selector: 'app-total-card',
  templateUrl: './total-card.component.html',
  styleUrls: ['./total-card.component.scss']
})
export class TotalCardComponent implements OnInit {

  @Input() tribeTotal: TribeTotal;
  @Input() round?: number;

  constructor() { }

  ngOnInit(): void {
  }

}
