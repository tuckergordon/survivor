export interface Player {
  name: string;
  email: string;
  tribe: TribeDataModel;
  scores: number[];
  eliminated: number;
}

export interface TribeDataModel {
  name: string;
  id: string;
  councils: number;
  color?: string;
  firstRound: number;
  lastRound?: number;
}

export interface Tribe extends TribeDataModel {
  players: Player[];
}

export interface TribeTotal extends Tribe {
  total: number;
}
