import { Component, OnInit } from '@angular/core';
import { Player } from '../shared/models/survivor.model';
import { DataService } from '../shared/services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.scss']
})
export class RosterComponent implements OnInit {

  tribes$: Observable<any[]>;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    // this.tribes$ = this.dataService.getPlayersByTribe();
  }

}
