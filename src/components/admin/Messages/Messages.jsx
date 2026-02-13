import { useState, useEffect } from 'react';
import { getMessages, updateMessageStatus, deleteMessage } from '../../../services/api';
import MessagesSkeleton from './MessagesSkeleton';
const Messages = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        const fetchMessages = async () => {
            try {
                const token = localStorage.getItem('adminToken');
                const response = await getMessages(token);
                setMessages(response.data.messages);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching messages:', error);
                alert('Failed to fetch messages');
            }
        };

        fetchMessages();
    }, []);

    const handleToggleRead = async (messageId, currentStatus) => {
        try {
            const token = localStorage.getItem('adminToken');
            await updateMessageStatus(token, messageId, !currentStatus);

            // Update local state
            setMessages(messages.map(msg =>
                msg._id === messageId ? { ...msg, isRead: !currentStatus } : msg
            ));
        } catch (error) {
            console.error('Error updating message status:', error);
            alert('Failed to update message status');
        }
    };

    const handleDeleteMessage = async (messageId) => {
        if (!window.confirm('Are you sure you want to delete this message?')) {
            return;
        }

        try {
            const token = localStorage.getItem('adminToken');
            await deleteMessage(token, messageId);

            // Remove from local state
            setMessages(messages.filter(msg => msg._id !== messageId));
        } catch (error) {
            console.error('Error deleting message:', error);
            alert('Failed to delete message');
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).format(date);
    };
    return (
        <div className="messages-section">
            {loading ?
                <MessagesSkeleton />
                : messages.length > 0 ? (
                    <div className="messages-list">
                        {
                            messages.map((message) => (
                                <div key={message._id} className={`message-card ${message.isRead ? 'read' : 'unread'}`}>
                                    <div className="message-header">
                                        <div className="message-from">
                                            <strong>{message.name}</strong>
                                            <span className="message-email">{message.email}</span>
                                        </div>
                                        <div className="message-meta">
                                            {!message.isRead && <span className="unread-badge">New</span>}
                                            <span className="message-date">{formatDate(message.createdAt)}</span>
                                        </div>
                                    </div>
                                    <div className="message-body">
                                        {message.message}
                                    </div>
                                    <div className="message-actions">
                                        <a href={`mailto:${message.email}`} className="action-link">
                                            Reply
                                        </a>
                                        <button
                                            onClick={() => handleToggleRead(message._id, message.isRead)}
                                            className="action-link action-button"
                                        >
                                            {message.isRead ? 'Mark Unread' : 'Mark Read'}
                                        </button>
                                        <button
                                            onClick={() => handleDeleteMessage(message._id)}
                                            className="action-link action-button delete-button"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                ) : (
                    <div className="empty-state">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                        <h3>No messages yet</h3>
                        <p>Messages from your contact form will appear here</p>
                    </div>
                )}
        </div>
    );
};

export default Messages;