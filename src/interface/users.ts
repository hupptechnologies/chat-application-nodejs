import { CreationOptional, Model } from 'sequelize';

export interface UserAttributes {
	readonly id?: CreationOptional<number>;
	userName: string;
	email: string;
	password: string | undefined;
	isDeleted?: boolean;
	readonly createdAt?: Date;
	readonly updatedAt?: Date;
}

export type UserInstance = Model<UserAttributes, UserAttributes>;
