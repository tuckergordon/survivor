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
  wins: number;
  losses: number;
  color?: string;
}

export interface Tribe extends TribeDataModel {
  players: Player[];
}

export interface TribeTotal extends Tribe {
  total: number;
}
