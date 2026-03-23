import { apiFetch, authFetch } from './apiClient';

// Get all projects
export const getProjects = () => apiFetch('/api/projects');

// Get single project
export const getProject = (id) => apiFetch(`/api/projects/${id}`);

// Create new project (Admin only)
export const createProject = (token, projectData) =>
    authFetch('/api/projects', token, {
        method: 'POST',
        body: JSON.stringify(projectData),
    });

// Update project (Admin only)
export const updateProject = (token, id, projectData) =>
    authFetch(`/api/projects/${id}`, token, {
        method: 'PUT',
        body: JSON.stringify(projectData),
    });

// Delete project (Admin only)
export const deleteProject = (token, id) =>
    authFetch(`/api/projects/${id}`, token, { method: 'DELETE' });