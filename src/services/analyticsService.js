import { apiFetch, authFetch, postFetch } from './apiClient';

// Track analytics event
export const trackEvent = async (eventType, eventData = {}) => {
    try {
        await postFetch('/api/analytics/track', { eventType, eventData });
    } catch (error) {
        console.warn('Analytics tracking failed:', error);
    }
};

// Get analytics stats (Admin only)
export const getAnalyticsStats = async (token, startDate = null, endDate = null, limit = 10) => {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    if (limit) params.append('limit', limit)
    const query = params.toString() ? `?${params}` : '';
    return authFetch(`/api/analytics/stats${query}`, token);
};

// Get global love count
export const getLoveCount = () => apiFetch('/api/analytics/loves');

// Add a love
export const addLove = () => postFetch('/api/analytics/love', {});

// Get recent activities (Admin only)
export const getRecentActivities = (token, limit = 10) =>
    authFetch(`/api/analytics/activities?limit=${limit}`, token);

// Delete analytics event (Admin only)
export const deleteAnalyticsEvent = (token, eventId) =>
    authFetch(`/api/analytics/${eventId}`, token, { method: 'DELETE' });

// Get terminal analytics (Admin only)
export const getTerminalAnalytics = async (token, startDate = null, endDate = null) => {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    const query = params.toString() ? `?${params}` : '';
    return authFetch(`/api/analytics/terminal${query}`, token);
};