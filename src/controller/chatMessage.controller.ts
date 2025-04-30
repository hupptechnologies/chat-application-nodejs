import { Server, Socket } from 'socket.io';
import { Op } from 'sequelize';
import { models } from '../models';
import {
	MessageStatus,
	SendMessageData,
	ChatHistoryData,
	UsersChatListData,
} from '../interface';

const { ChatMessages, Users } = models;

class ChatMessageController {
	private io: Server;
	private onlineUsers: Map<number, string>;

	constructor(io: Server) {
		this.io = io;
		this.onlineUsers = new Map();
		this.io.on('connection', this.handleConnection.bind(this));
	}

	private handleConnection(socket: Socket) {
		socket.on('user_connected', (userId: number) => {
			this.onlineUsers.set(userId, socket.id); // Add user to online users map
			this.io.emit('user_status_changed', { userId, status: 'online' }); // Notify all clients
		});

		// Listen for sending a new chat message
		socket.on('send_message', async (data: SendMessageData) => {
			try {
				const message = await ChatMessages.create({
					senderId: data.senderId,
					receiverId: data.receiverId,
					content: data.content,
					status: MessageStatus.SENT,
					sentAt: new Date(),
					deliveredAt: null,
					readAt: null,
				});

				// Emit the message with the server-assigned ID to both users
				const messageData = {
					id: message.dataValues.id, // Use the server-assigned ID
					senderId: message.dataValues.senderId,
					receiverId: message.dataValues.receiverId,
					content: message.dataValues.content,
					status: message.dataValues.status,
					sentAt: message.dataValues.sentAt,
					deliveredAt: message.dataValues.deliveredAt,
					readAt: message.dataValues.readAt,
				};

				// Notify both sender and receiver with the same message data
				this.io.emit(`receive_message_${data.receiverId}`, messageData);
				this.io.emit(`message_sent_${data.senderId}`, messageData);
			} catch (error) {
				console.error('Error saving message:', error);
			}
		});

		// Listen for marking a message as delivered
		socket.on(
			'message_delivered',
			async (data: { messageId: number; receiverId: number }) => {
				try {
					const deliveredAt = new Date();
					await ChatMessages.update(
						{ deliveredAt, status: MessageStatus.DELIVERED },
						{ where: { id: data.messageId } },
					);

					// Fetch the updated message
					const updatedMessage = await ChatMessages.findOne({
						where: { id: data.messageId },
					});

					if (updatedMessage && updatedMessage.dataValues) {
						// Notify both sender and receiver about the delivery status
						this.io.emit(
							`message_delivered_${updatedMessage.dataValues.senderId}`,
							updatedMessage.dataValues,
						);
						this.io.emit(
							`message_delivered_${updatedMessage.dataValues.receiverId}`,
							updatedMessage.dataValues,
						);
					}
				} catch (error) {
					console.error('Error updating delivered message:', error);
				}
			},
		);

		// In the message_read event handler
		socket.on(
			'message_read',
			async (data: {
				messageId: number;
				senderId: number;
				receiverId: number;
			}) => {
				try {
					const readAt = new Date();
					await ChatMessages.update(
						{ readAt, status: MessageStatus.READ },
						{ where: { id: data.messageId } },
					);

					// Fetch the updated message
					const updatedMessage = await ChatMessages.findOne({
						where: { id: data.messageId },
					});

					if (updatedMessage) {
						// Notify both sender and receiver about the read status
						this.io.emit(`message_read_${data.senderId}`, updatedMessage);
						this.io.emit(`message_read_${data.receiverId}`, updatedMessage);
					}
				} catch (error) {
					console.error('Error updating read message:', error);
				}
			},
		);

		// Listen for retrieving chat history between two users
		socket.on('get_chat_history', async (data: ChatHistoryData) => {
			try {
				const chatHistory = await ChatMessages.findAll({
					where: {
						[Op.or]: [
							{ senderId: data.userId, receiverId: data.otherUserId },
							{ senderId: data.otherUserId, receiverId: data.userId },
						],
					},
					order: [['sentAt', 'ASC']],
				});
				socket.emit('chat_history', chatHistory);
			} catch (error) {
				console.error('Error fetching chat history:', error);
			}
		});

		// Listen for listing all users with chat details (including the last message exchanged)
		socket.on('get_users_chat_list', async (data: UsersChatListData) => {
			try {
				// 1. Get all users except the current user.
				const users = await Users.findAll({
					where: { id: { [Op.ne]: data.userId } },
					attributes: { exclude: ['isDeleted', 'password'] },
				});

				// 2. For each user, fetch the last message exchanged with the current user and the unread message count.
				const chatListWithLastMessage = await Promise.all(
					users.map(async (user: any) => {
						const lastMessage = await ChatMessages.findOne({
							where: {
								[Op.or]: [
									{ senderId: data.userId, receiverId: user.id },
									{ senderId: user.id, receiverId: data.userId },
								],
							},
							order: [['sentAt', 'DESC']],
						});

						// Fetch unread message count
						const unreadCount = await ChatMessages.count({
							where: {
								senderId: user.id,
								receiverId: data.userId,
								[Op.or]: [
									{ status: MessageStatus.SENT },
									{ status: MessageStatus.DELIVERED },
								],
							},
						});
						return {
							...user.get({ plain: true }),
							lastMessage: lastMessage || null, // ensures lastMessage is null if not found
							unreadCount, // add unread message count
						};
					}),
				);

				// 3. Sort the chat list based on the last message's sentAt timestamp.
				chatListWithLastMessage.sort((a, b) => {
					const aTime = a.lastMessage
						? new Date(a.lastMessage.sentAt).getTime()
						: 0;
					const bTime = b.lastMessage
						? new Date(b.lastMessage.sentAt).getTime()
						: 0;
					return bTime - aTime; // Sort in descending order of the sentAt timestamp
				});

				// 4. Emit the sorted list to the client.
				socket.emit('users_chat_list', chatListWithLastMessage);
			} catch (error) {
				console.error('Error fetching users chat list:', error);
			}
		});

		// Handle disconnection
		socket.on('disconnect', () => {
			// Find the user who disconnected
			for (const [userId, socketId] of this.onlineUsers.entries()) {
				if (socketId === socket.id) {
					this.onlineUsers.delete(userId); // Remove user from online users map
					this.io.emit('user_status_changed', { userId, status: 'offline' }); // Notify all clients
					break;
				}
			}
		});
	}
}

export default ChatMessageController;
