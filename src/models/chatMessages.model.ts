import {
	Table,
	Model,
	Column,
	DataType,
	ForeignKey,
	BelongsTo,
} from 'sequelize-typescript';
import { ChatMessageInstance, MessageStatus } from '../interface';
import Users from './users.model';

@Table({
	timestamps: true, // Automatically adds createdAt and updatedAt fields
	tableName: 'chat_messages',
	freezeTableName: true, // Prevents Sequelize from pluralizing the table name
	schema: 'public',
})
export default class ChatMessages extends Model<ChatMessageInstance> {
	// Primary Key (auto-incremented)
	@Column({
		type: DataType.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	})
	declare id: number;

	// Foreign Key: references the User model (sender)
	@ForeignKey(() => Users)
	@Column(DataType.INTEGER)
	declare senderId: number;

	// Foreign Key: references the User model (receiver)
	@ForeignKey(() => Users)
	@Column(DataType.INTEGER)
	declare receiverId: number;

	// Message content (text, media, etc.)
	@Column(DataType.STRING(1024))
	declare content: string;

	// Status of message (SENT, DELIVERED, READ)
	@Column({
		type: DataType.ENUM(...Object.values(MessageStatus)), // Use ENUM for status
		defaultValue: MessageStatus.SENT, // Default status is SENT
	})
	declare status: MessageStatus;

	// Timestamp when the message was sent
	@Column({
		type: DataType.DATE,
		defaultValue: DataType.NOW, // Default value is the current timestamp
	})
	declare sentAt: Date;

	// Timestamp when the message was delivered
	@Column(DataType.DATE)
	declare deliveredAt: Date | null; // Nullable field

	// Timestamp when the message was read
	@Column(DataType.DATE)
	declare readAt: Date | null; // Nullable field

	// Associations (optional but recommended for querying)
	@BelongsTo(() => Users, 'senderId')
	declare sender: Users;

	@BelongsTo(() => Users, 'receiverId')
	declare receiver: Users;
}
