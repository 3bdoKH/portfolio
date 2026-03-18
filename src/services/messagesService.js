const API_URL = process.env.REACT_APP_API_URL;

// Get all messages (Admin only)
export const getMessages = async (token, page = 1, limit = 10, unreadOnly = false) => {
    try {
        const response = await fetch(
            `${API_URL}/api/contact/messages?page=${page}&limit=${limit}&unreadOnly=${unreadOnly}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch messages');
        }

        return data;
    } catch (error) {
        console.error('Get messages error:', error);
        throw error;
    }
};

// Update message status (Admin only)
export const updateMessageStatus = async (token, messageId, isRead) => {
    try {
        const response = await fetch(
            `${API_URL}/api/contact/messages/${messageId}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ isRead }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to update message status');
        }

        return data;
    } catch (error) {
        console.error('Update message status error:', error);
        throw error;
    }
};

// Delete message (Admin only)
export const deleteMessage = async (token, messageId) => {
    try {
        const response = await fetch(
            `${API_URL}/api/contact/messages/${messageId}`,
            {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to delete message');
        }

        return data;
    } catch (error) {
        console.error('Delete message error:', error);
        throw error;
    }
};