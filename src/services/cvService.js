const API_URL = process.env.REACT_APP_API_URL;

// Upload CV (Admin only)
export const uploadCV = async (token, cvData) => {
    try {
        const response = await fetch(`${API_URL}/api/cv/upload`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(cvData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to upload CV');
        }

        return data;
    } catch (error) {
        console.error('Upload CV error:', error);
        throw error;
    }
};

// Get CV metadata
export const getCVMetadata = async () => {
    try {
        const response = await fetch(`${API_URL}/api/cv/metadata`);

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch CV metadata');
        }

        return data;
    } catch (error) {
        console.error('Get CV metadata error:', error);
        throw error;
    }
};

// Get CV file
export const getCVFile = async () => {
    try {
        const response = await fetch(`${API_URL}/api/cv/file`);

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch CV file');
        }

        return data;
    } catch (error) {
        console.error('Get CV file error:', error);
        throw error;
    }
};

// Delete CV (Admin only)
export const deleteCV = async (token) => {
    try {
        const response = await fetch(`${API_URL}/api/cv`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to delete CV');
        }

        return data;
    } catch (error) {
        console.error('Delete CV error:', error);
        throw error;
    }
};