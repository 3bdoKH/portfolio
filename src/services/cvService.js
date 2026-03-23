import { apiFetch, authFetch } from './apiClient';

// Upload CV (Admin only)
export const uploadCV = (token, cvData) =>
    authFetch('/api/cv/upload', token, {
        method: 'POST',
        body: JSON.stringify(cvData),
    });

// Get CV metadata
export const getCVMetadata = () => apiFetch('/api/cv/metadata');

// Get CV file
export const getCVFile = () => apiFetch('/api/cv/file');

// Delete CV (Admin only)
export const deleteCV = (token) => authFetch('/api/cv', token, { method: 'DELETE' });