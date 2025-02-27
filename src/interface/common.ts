import { Optional } from 'sequelize';

export interface QueryAttributes {
	search: string;
	limit: number;
	offset: number;
}

export type TQuery = Optional<QueryAttributes, 'search' | 'limit' | 'offset'>;
