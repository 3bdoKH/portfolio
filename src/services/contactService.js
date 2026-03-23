import { postFetch } from './apiClient';

// Submit contact form
export const submitContactForm = (formData) => postFetch('/api/contact', formData);