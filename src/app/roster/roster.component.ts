import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tribe, Player } from '../shared/models/survivor.model';

@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.scss']
})
export class RosterComponent implements OnInit {

  tribes$: Observable<any[]>;

  ROUND = 15;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    const tribes$ = this.dataService.getTribes();
    const players$ = this.dataService.getPlayers(null);

    this.tribes$ = combineLatest([tribes$, players$]).pipe(map(([tribes, players]) => {
      return tribes.map(tribe => {
        const tribePlayers = players.filter(player => {
          const playerTribe = DataService.getPlayerTribe(player, tribe.firstRound);
          return playerTribe && playerTribe.id === tribe.id;
        });
        return {
          ...tribe,
          players: tribePlayers
        };
      }).sort((a, b) => {
        if (!a.lastRound && b.lastRound) return -1;
        if (!b.lastRound && a.lastRound) return 1;
        if (!a.lastRound && !b.lastRound) return a.id.localeCompare(b.id);

        return a.lastRound - b.lastRound;
      });
    }));
  }

  isOld(tribe: Tribe) {
    return tribe.lastRound && tribe.lastRound < this.ROUND;
  }

  isPlayerEliminated(player: Player) {
    if (player.secondElim) return true;
    if (player.firstElim) {
      const playerScore = DataService.getPlayerScore(player, this.ROUND);
      if (player.firstElim === this.ROUND) return true;
      if (!playerScore && playerScore !== 0) return true;
    }
    return false;
  }

}
