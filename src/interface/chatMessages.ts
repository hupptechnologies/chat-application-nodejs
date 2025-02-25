import { CreationOptional, Model } from 'sequelize';
export enum MessageStatus {
	SENT = 'sent',
	DELIVERED = 'delivered',
	READ = 'read'
}

export interface ChatMessageAttributes {
	id?: CreationOptional<number>
	senderId: number;
	receiverId: number;
	message: string;
	status: MessageStatus;
	sentAt: Date;
	deliveredAt?: Date;
	readAt?: Date;
}

export interface SendMessageData {
	senderId: number;
	receiverId: number;
	content: string;
}

export interface ChatHistoryData {
	userId: number;
	otherUserId: number;
}

export interface UsersChatListData {
	userId: number;
}


export type ChatMessageInstance = Model<ChatMessageAttributes, ChatMessageAttributes>;
