import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, combineLatest, of } from 'rxjs';
import { shareReplay, map } from 'rxjs/operators';
import { Player, TribeDataModel, Tribe, TribeTotal } from '../models/survivor.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  players$: Observable<Player[]>;
  tribes$: Observable<TribeDataModel[]>;
  tribeMap$: Observable<{ [key: string]: TribeDataModel }>;

  constructor(private http: HttpClient) { }

  // getPlayersByTribe(): Observable<Tribe[]> {

  // }

  // getTribes(): Observable<Tribe[]> {
  //   const rawData$ = this.http.get<Player[]>('assets/data/data.json').pipe(
  //     map(players => {
  //       const tribes = {};
  //       players = players.map(player => {
  //         player.eliminated = !!player['roundEliminated'];
  //         return player;
  //       }).sort((a, b) => {
  //         if (a.eliminated !== b.eliminated) {
  //           return +a.eliminated - +b.eliminated;
  //         }
  //         return a.name.localeCompare(b.name);
  //       });
  //       players.forEach(player => {
  //         if (!(player.tribe in tribes)) {
  //           tribes[player.tribe] = {
  //             id: player.tribe,
  //             name: 'Tribe ' + player.tribe, // TODO: name
  //             players: []
  //           };
  //         }
  //         tribes[player.tribe].players.push(player);
  //       });
  //       return Object.values<Tribe>(tribes).sort((a, b) => a.id.localeCompare(b.id));
  //     }),
  //     shareReplay(1)
  //   );
  //   return rawData$;
  // }

  getPlayersByTribe(): Observable<Tribe[]> {
    return this.getPlayers().pipe(
      map(players => {
        const tribes = {};
        players.forEach(player => {
          if (!(player.tribe.id in tribes)) {
            tribes[player.tribe.id] = {
              ...player.tribe,
              players: []
            };
          }
          tribes[player.tribe.id].players.push(player);
        });
        return Object.values<any>(tribes).sort((a, b) => a.id.localeCompare(b.id)); // TODO: type
      }),
      shareReplay(1)
    );
  }

  // round 1 = 1
  getRoundTotals(round: number): Observable<TribeTotal[]> {
    if (!round) return null;
    return this.getPlayersByTribe().pipe(
      map(tribes => {
        const totals = tribes.map(tribe => {
          let total = 0;
          const players = [];
          tribe.players.forEach(player => {
            const score = +player['round' + round];
            total += score;
            players.push({
              ...player,
              score
            });
            // total += player.scores[round - 1];  // 1 indexing TODO: scores array
          });
          return {
            ...tribe,
            players,
            total
          } as TribeTotal;
        });
        return totals;
      })
    );
  }

  getPlayers(): Observable<Player[]> {
    if (!this.players$) {
      const rawData$ = this.http.get<Player[]>('assets/data/data.json');

      this.players$ = combineLatest([rawData$, this.getTribesMap()]).pipe(
        map(results => {
          return results[0].map(player => {
            return {
              ...player,
              tribe: results[1]['' + player.tribe]
            };
          }).sort((a, b) => {
            if (a.eliminated !== b.eliminated) {
              return +a.eliminated - +b.eliminated;
            }
            return a.name.localeCompare(b.name);
          });
        }),
        shareReplay(1)
      );
    }
    return this.players$;
  }

  getTribes(): Observable<TribeDataModel[]> {
    this._populateTribes();
    return this.tribes$;
  }

  getTribesMap(): Observable<{ [key: string]: TribeDataModel; }> {
    this._populateTribes();
    return this.tribeMap$;
  }

  private _populateTribes() {
    if (!this.tribes$) {
      this.tribes$ = this.http.get<TribeDataModel[]>('assets/data/tribes.json').pipe(shareReplay(1));
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
}
