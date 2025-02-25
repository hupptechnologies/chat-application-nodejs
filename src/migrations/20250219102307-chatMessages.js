'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createSchema('public', { ifNotExists: true }),
    await queryInterface.createTable('chat_messages', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      senderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users', // Make sure the table name is correct in your DB
          key: 'id',
        },
        onDelete: 'CASCADE', // Optional: If a user is deleted, their messages will be deleted
        onUpdate: 'CASCADE', // Optional: If the user id is updated, update the reference
      },
      receiverId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      content: {
        type: Sequelize.STRING(1024),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('sent', 'delivered', 'read'), // Using the same status as defined in your model
        allowNull: false,
        defaultValue: 'sent', // Default to 'sent'
      },
      deliveredAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      readAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      sentAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW, // Default to the current date and time
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
		await queryInterface.dropTable({
			tableName: 'chat_messages',
			schema: 'public'
		});
	}
};
