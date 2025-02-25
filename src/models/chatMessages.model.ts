import { Table, Model, Column, DataType, ForeignKey } from 'sequelize-typescript';
import { ChatMessageInstance, MessageStatus } from '../interface';
import Users from './users.model';

@Table({
  timestamps: true,
  tableName: 'chat_messages',
  freezeTableName: true,
  schema: 'public'
})
export default class ChatMessages extends Model<ChatMessageInstance> {

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

  // Status of message (0: sent, 1: delivered, 2: read)
  @Column(DataType.INTEGER)
  declare status: MessageStatus;

  // Timestamp when the message was delivered
  @Column(DataType.DATE)
  declare deliveredAt: Date;

  // Timestamp when the message was read
  @Column(DataType.DATE)
  declare readAt: Date;

  // Timestamp when the message was created
  @Column(DataType.DATE)
  declare sentAt: Date;
}
