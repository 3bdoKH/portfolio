const API_URL = process.env.REACT_APP_API_URL;

// Get all projects
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

// Get single project (Not implemented)
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

// Create new project (Admin only)
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

// Update project (Admin only)
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

// Delete project (Admin only)
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