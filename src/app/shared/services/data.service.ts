import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, combineLatest, of } from 'rxjs';
import { shareReplay, map } from 'rxjs/operators';
import { Player, PlayerDataModel, Tribe, Round } from '../models/survivor.model';

export interface GetPlayerOptions {
  tribeId?: string;
  round: number;  // 1 = round 1
}

export enum AggregateBy {
  SUM = 'SUM',
  AVG = 'AVG'
}

export enum SortBy {
  ASC = 'ASC',
  DESC = 'DESC'
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  players$: Observable<Player[]>;
  tribes$: Observable<Tribe[]>;
  tribeMap$: Observable<{ [key: string]: Tribe }>;

  constructor(private http: HttpClient) { }

  getPlayers(options: GetPlayerOptions): Observable<Player[]> {
    if (!this.players$) {
      const rawData$ = this.http.get<PlayerDataModel[]>('assets/data/data-full.json')
        .pipe(shareReplay(1));

      this.players$ = combineLatest([rawData$, this.getTribesMap()]).pipe(
        map(results => {
          return results[0].map(player => {
            return {
              ...player,
              rounds: this.playerRoundsFromData(player, results[1])
            } as Player;
          }).sort((a, b) => {
            if (a.secondElim !== b.secondElim) {
              return +a.secondElim - b.secondElim;
            }
            if (a.firstElim !== b.firstElim) {
              return +a.firstElim - +b.firstElim;
            }
            return a.name.localeCompare(b.name);
          });
        }),
        shareReplay(1)
      );
    }
    return this.players$.pipe(map(players => {
      return players.filter(player => {
        let filter = true;

        const playerRound = DataService.getPlayerRound(player, options.round);
        if (!playerRound || !playerRound.tribe || !playerRound.score && playerRound.score !== 0) {
          filter = false;
        }

        if (options.tribeId && playerRound.tribe.id !== options.tribeId) {
          filter = false;
        }
        return filter;
      });
    }));
  }

  playerRoundsFromData(player: PlayerDataModel, tribeMap: { [key: string]: Tribe; }): Round[] {
    const rounds = [];
    for (let i = 1; `round${i}Score` in player; i++) {
      rounds.push({
        score: player[`round${i}Score`],
        tribe: tribeMap[player[`round${i}Tribe`]]
      });
    }
    return rounds;
  }

  getTribes(round?: number): Observable<Tribe[]> {
    this._populateTribes();
    return this.tribes$.pipe(map(tribes => {
      return tribes.filter(tribe => {
        if (tribe.firstRound > round) return false;
        if (tribe.lastRound && tribe.lastRound < round) return false;
        return true;
      });
    }));
  }

  getTribeScores(round: number, agg = AggregateBy.SUM, sortBy = SortBy.DESC): Observable<Round[]> {
    return this.getPlayers({ round }).pipe(map(players => {
      const tribeMap = {};
      players.forEach(player => {
        const playerRound = DataService.getPlayerRound(player, round);
        const tribe = playerRound.tribe;
        if (!(tribe.id in tribeMap)) {
          tribeMap[tribe.id] = {
            tribe,
            score: 0,
            playerCount: 0
          };
        }
        tribeMap[playerRound.tribe.id].score += player.rounds[round - 1].score;
        tribeMap[playerRound.tribe.id].playerCount++;
      });
      let tribeScores = Object.values<any>(tribeMap);
      if (agg === AggregateBy.AVG) {
        tribeScores = tribeScores.map(_round => {
          return {
            ..._round,
            score: _round.score /= _round.playerCount
          };
        });
      }
      return tribeScores.sort((_a, _b) => {
        const a = _a.score;
        const b = _b.score;
        return sortBy === SortBy.DESC ? b - a : a - b;
      });
    }));
  }

  getRoundEliminated(round: number): Observable<Player[]> {
    return this.getPlayers({ round }).pipe(map(players => {
      return players.filter(player => player.firstElim === round || player.secondElim === round);
    }));
  }

  getTribesMap(): Observable<{ [key: string]: Tribe; }> {
    this._populateTribes();
    return this.tribeMap$;
  }

  private _populateTribes() {
    if (!this.tribes$) {
      this.tribes$ = this.http.get<Tribe[]>('assets/data/tribes-full.json')
        .pipe(shareReplay(1));
      this.tribeMap$ = this.tribes$.pipe(
        map(tribes => {
          const tribesMap = {};
          tribes.forEach(tribe => tribesMap[tribe.id] = tribe);
          return tribesMap;
        }),
        shareReplay(1)
      );
    }
  }

  // tslint:disable-next-line: member-ordering
  static getPlayerRound(player: Player, round: number): Round {
    return player.rounds[round - 1];
  }

  // tslint:disable-next-line: member-ordering
  static getPlayerScore(player: Player, round: number): number {
    return this.getPlayerRound(player, round).score;
  }

  // tslint:disable-next-line: member-ordering
  static getPlayerTribe(player: Player, round: number): Tribe {
    return this.getPlayerRound(player, round).tribe;
  }

  // e.g. 'Tucker G.'
  // tslint:disable-next-line: member-ordering
  static getFirstNameLastInitial(fullname: string): string {
    const names = fullname.split(' ');
    return `${names[0]} ${names[1][0]}.`;
  }
}
