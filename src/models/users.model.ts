import { Table, Model, Column, DataType } from 'sequelize-typescript';
import { UserAttributes } from '../interface';
@Table({
	timestamps: true,
	tableName: 'users',
	freezeTableName: true,
	schema: 'public'
})

export default class Users extends Model<UserAttributes, UserAttributes> {

	@Column(DataType.STRING(1024))
	declare userName: string;

	@Column(DataType.STRING(1024))
	declare	email: string;

	@Column(DataType.STRING)
	declare password: string;

	@Column(DataType.BOOLEAN)
	declare isDeleted: boolean;
}
