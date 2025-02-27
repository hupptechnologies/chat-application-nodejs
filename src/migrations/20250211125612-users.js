'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createSchema('public', { ifNotExists: true }),
			await queryInterface.createTable(
				'users',
				{
					id: {
						allowNull: false,
						autoIncrement: true,
						primaryKey: true,
						type: Sequelize.INTEGER,
					},
					userName: {
						type: Sequelize.STRING(1024),
						allowNull: false,
					},
					email: {
						type: Sequelize.STRING(1024),
						unique: true,
						allowNull: false,
					},
					password: {
						type: Sequelize.STRING,
						allowNull: false,
					},
					isDeleted: {
						type: Sequelize.BOOLEAN,
						defaultValue: false,
					},
					createdAt: {
						allowNull: false,
						type: Sequelize.DATE,
					},
					updatedAt: {
						allowNull: false,
						type: Sequelize.DATE,
					},
				},
				{
					schema: 'public',
					freezeTableName: true,
					timestamps: true,
				},
			);
	},
	async down(queryInterface) {
		await queryInterface.dropTable({
			tableName: 'users',
			schema: 'public',
		});
	},
};
