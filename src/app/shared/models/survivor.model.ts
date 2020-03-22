export interface Player {
	name: string;
	email: string;
	tribe: Tribe;
	scores: number[];
	eliminated: boolean;
}

export interface Tribe {
	name: string;
	id: string;
	wins: number;
	losses: number;
	color?: string;
}
