const API_URL = process.env.REACT_APP_API_URL;

// Track analytics event
export const trackEvent = async (eventType, eventData = {}) => {
    try {
        await fetch(`${API_URL}/api/analytics/track`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                eventType,
                eventData,
            }),
        });
    } catch (error) {
        console.warn('Analytics tracking failed:', error);
    }
};

// Get analytics stats (Admin only)
export const getAnalyticsStats = async (token, startDate = null, endDate = null) => {
    try {
        let url = `${API_URL}/api/analytics/stats`;
        const params = new URLSearchParams();

        if (startDate) params.append('startDate', startDate);
        if (endDate) params.append('endDate', endDate);

        if (params.toString()) {
            url += `?${params.toString()}`;
        }

        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch analytics');
        }
        return data;
    } catch (error) {
        console.error('Get analytics error:', error);
        throw error;
    }
};

// Get global love count
export const getLoveCount = async () => {
    try {
        const response = await fetch(`${API_URL}/api/analytics/loves`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch love count');
        }
        return data;
    } catch (error) {
        console.error('Get love count error:', error);
        throw error;
    }
};

// Add a love
export const addLove = async () => {
    try {
        const response = await fetch(`${API_URL}/api/analytics/love`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to add love');
        }
        return data;
    } catch (error) {
        console.error('Add love error:', error);
        throw error;
    }
};

// Get recent activities (Admin only)
export const getRecentActivities = async (token, limit = 10) => {
    try {
        const response = await fetch(`${API_URL}/api/analytics/recent?limit=${limit}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch recent activities');
        }

        return data;
    } catch (error) {
        console.error('Get recent activities error:', error);
        throw error;
    }
};

// Delete analytics event (Admin only)
export const deleteAnalyticsEvent = async (token, eventId) => {
    try {
        const response = await fetch(`${API_URL}/api/analytics/${eventId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to delete analytics event');
        }

        return data;
    } catch (error) {
        console.error('Delete analytics event error:', error);
        throw error;
    }
};

// Get terminal analytics (Admin only)
export const getTerminalAnalytics = async (token, startDate = null, endDate = null) => {
    try {
        let url = `${API_URL}/api/analytics/terminal`;
        const params = new URLSearchParams();

        if (startDate) params.append('startDate', startDate);
        if (endDate) params.append('endDate', endDate);

        if (params.toString()) {
            url += `?${params.toString()}`;
        }

        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch analytics');
        }

        return data;
    } catch (error) {
        console.error('Get analytics error:', error);
        throw error;
    }
};