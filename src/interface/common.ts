import { Optional } from 'sequelize';

export interface QuertyAttributes {
	search: string,
	limit: number,
	offset: number
}

export type TQuery = Optional<QuertyAttributes, 'search' | 'limit' | 'offset' >;
