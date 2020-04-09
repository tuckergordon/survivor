// export interface Player {
//   name: string;
//   email: string;
//   tribe: TribeDataModel;
//   scores: number[];
//   eliminated: number;
// }

// export interface TribeDataModel {
//   name: string;
//   id: string;
//   councils: number;
//   color?: string;
//   firstRound: number;
//   lastRound?: number;
// }

// export interface Tribe extends TribeDataModel {
//   players: Player[];
// }


export interface Tribe {
  name: string;
  id: string;
  councils: number;
  color?: string;
  firstRound: number;
  lastRound?: number;
}

export interface Player {
  name: string;
  email: string;
  rounds: Round[];
  firstElim?: number;
  secondElim?: number;
}

export interface PlayerDataModel {
  name: string;
  email: string;
  tribe: string;
  firstElim?: number;
  secondElim?: number;
  [key: string]: any;
}

export interface Round {
  tribe: Tribe;
  score: number;
}

export interface TribeRound extends Round {
  players: Player[];
}
