const API_URL = process.env.REACT_APP_API_URL;

// Submit contact form
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