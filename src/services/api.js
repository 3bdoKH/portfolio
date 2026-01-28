/**
 * API Service for Portfolio Backend
 */

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

/**
 * Submit contact form
 */
export const submitContactForm = async (formData) => {
    try {
        const response = await fetch(`${API_URL}/api/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to submit contact form');
        }

        return data;
    } catch (error) {
        console.error('Contact form submission error:', error);
        throw error;
    }
};

/**
 * Track analytics event
 */
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
        // Silently fail for analytics
        console.warn('Analytics tracking failed:', error);
    }
};

/**
 * Admin login
 */
export const adminLogin = async (credentials) => {
    try {
        const response = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }

        return data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

/**
 * Get all messages (Admin only)
 */
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

/**
 * Get analytics stats (Admin only)
 */
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

/**
 * Get all projects
 */
export const getProjects = async () => {
    try {
        const response = await fetch(`${API_URL}/api/projects`);

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch projects');
        }

        return data;
    } catch (error) {
        console.error('Get projects error:', error);
        throw error;
    }
};

/**
 * Get single project
 */
export const getProject = async (id) => {
    try {
        const response = await fetch(`${API_URL}/api/projects/${id}`);

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch project');
        }

        return data;
    } catch (error) {
        console.error('Get project error:', error);
        throw error;
    }
};

/**
 * Create new project (Admin only)
 */
export const createProject = async (token, projectData) => {
    try {
        const response = await fetch(`${API_URL}/api/projects`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(projectData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to create project');
        }

        return data;
    } catch (error) {
        console.error('Create project error:', error);
        throw error;
    }
};

/**
 * Update project (Admin only)
 */
export const updateProject = async (token, id, projectData) => {
    try {
        const response = await fetch(`${API_URL}/api/projects/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(projectData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to update project');
        }

        return data;
    } catch (error) {
        console.error('Update project error:', error);
        throw error;
    }
};

/**
 * Delete project (Admin only)
 */
export const deleteProject = async (token, id) => {
    try {
        const response = await fetch(`${API_URL}/api/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to delete project');
        }

        return data;
    } catch (error) {
        console.error('Delete project error:', error);
        throw error;
    }
};

export default {
    submitContactForm,
    trackEvent,
    adminLogin,
    getMessages,
    getAnalyticsStats,
    getProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject,
};
