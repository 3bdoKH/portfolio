import { authFetch } from './apiClient';

// Get all messages (Admin only)
export const getMessages = (token, page = 1, limit = 10, unreadOnly = false) =>
    authFetch(
        `/api/contact/messages?page=${page}&limit=${limit}&unreadOnly=${unreadOnly}`,
        token
    );

// Update message status (Admin only)
export const updateMessageStatus = (token, messageId, isRead) =>
    authFetch(`/api/contact/messages/${messageId}`, token, {
        method: 'PATCH',
        body: JSON.stringify({ isRead }),
    });

// Delete message (Admin only)
export const deleteMessage = (token, messageId) =>
    authFetch(`/api/contact/messages/${messageId}`, token, { method: 'DELETE' });