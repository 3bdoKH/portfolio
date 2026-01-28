import { useState, useEffect } from 'react';
import { getProjects, createProject, updateProject, deleteProject } from '../../services/api';
import './ProjectsManager.css';

const ProjectsManager = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        displayTitle: '',
        description: '',
        image: '',
        tags: [],
        links: { live: '' },
        featured: false,
        order: 0,
    });
    const [tagInput, setTagInput] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        setLoading(true);
        try {
            const response = await getProjects();
            setProjects(response.data.projects);
        } catch (err) {
            setError('Failed to load projects');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (project = null) => {
        if (project) {
            setEditingProject(project);
            setFormData({
                title: project.title,
                displayTitle: project.displayTitle,
                description: project.description,
                image: project.image,
                tags: project.tags || [],
                links: project.links || { live: '' },
                featured: project.featured || false,
                order: project.order || 0,
            });
            setImagePreview(project.image);
        } else {
            setEditingProject(null);
            setFormData({
                title: '',
                displayTitle: '',
                description: '',
                image: '',
                tags: [],
                links: { live: '' },
                featured: false,
                order: 0,
            });
            setImagePreview('');
        }
        setShowModal(true);
        setError('');
        setSuccess('');
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingProject(null);
        setTagInput('');
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name === 'live') {
            setFormData(prev => ({
                ...prev,
                links: { ...prev.links, live: value }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Check file size (limit to 2MB)
            if (file.size > 2 * 1024 * 1024) {
                setError('Image size must be less than 2MB');
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setFormData(prev => ({ ...prev, image: base64String }));
                setImagePreview(base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddTag = () => {
        if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
            setFormData(prev => ({
                ...prev,
                tags: [...prev.tags, tagInput.trim()]
            }));
            setTagInput('');
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validation
        if (!formData.title || !formData.displayTitle || !formData.description) {
            setError('Please fill in all required fields');
            return;
        }

        if (formData.tags.length === 0) {
            setError('Please add at least one tag');
            return;
        }

        try {
            const token = localStorage.getItem('adminToken');

            if (editingProject) {
                await updateProject(token, editingProject._id, formData);
                setSuccess('Project updated successfully!');
            } else {
                await createProject(token, formData);
                setSuccess('Project created successfully!');
            }

            setTimeout(() => {
                handleCloseModal();
                loadProjects();
            }, 1500);
        } catch (err) {
            setError(err.message || 'Failed to save project');
        }
    };

    const handleDelete = async (projectId, projectTitle) => {
        if (!window.confirm(`Are you sure you want to delete "${projectTitle}"?`)) {
            return;
        }

        try {
            const token = localStorage.getItem('adminToken');
            await deleteProject(token, projectId);
            setSuccess('Project deleted successfully!');
            loadProjects();
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.message || 'Failed to delete project');
            setTimeout(() => setError(''), 3000);
        }
    };

    if (loading) {
        return (
            <div className="projects-manager">
                <div className="loading-container">
                    <div className="spinner-large"></div>
                    <p>Loading projects...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="projects-manager">
            {/* Header */}
            <div className="manager-header">
                <h2>Manage Projects</h2>
                <button onClick={() => handleOpenModal()} className="btn-primary-projects">
                    + Add New Project
                </button>
            </div>

            {/* Success/Error Messages */}
            {success && <div className="alert alert-success">{success}</div>}
            {error && <div className="alert alert-error">{error}</div>}

            {/* Projects Grid */}
            {projects.length === 0 ? (
                <div className="empty-state">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <line x1="9" y1="9" x2="15" y2="9" />
                        <line x1="9" y1="15" x2="15" y2="15" />
                    </svg>
                    <h3>No projects yet</h3>
                    <p>Create your first project to get started</p>
                </div>
            ) : (
                <div className="projects-grid">
                    {projects.map((project) => (
                        <div key={project._id} className="project-item">
                            <div className="project-image-container">
                                {project.image ? (
                                    <img src={project.image} alt={project.displayTitle} />
                                ) : (
                                    <div className="no-image">No Image</div>
                                )}
                                {project.featured && <span className="featured-badge">Featured</span>}
                            </div>
                            <div className="project-info">
                                <h3>{project.displayTitle}</h3>
                                <p className="project-desc">{project.description}</p>
                                <div className="project-tags">
                                    {project.tags.map((tag, idx) => (
                                        <span key={idx} className="tag">{tag}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="project-actions">
                                <button
                                    onClick={() => handleOpenModal(project)}
                                    className="btn-edit"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(project._id, project.displayTitle)}
                                    className="btn-delete"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{editingProject ? 'Edit Project' : 'Add New Project'}</h2>
                            <button onClick={handleCloseModal} className="modal-close">&times;</button>
                        </div>

                        <form onSubmit={handleSubmit} className="project-form">
                            <div className="form-row">
                                <div className="form-group-projects">
                                    <label>Title (Internal) *</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        placeholder="e.g., project_one"
                                        required
                                    />
                                </div>

                                <div className="form-group-projects">
                                    <label>Display Title *</label>
                                    <input
                                        type="text"
                                        name="displayTitle"
                                        value={formData.displayTitle}
                                        onChange={handleInputChange}
                                        placeholder="e.g., My Awesome Project"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group-projects">
                                <label>Description *</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Brief description of the project..."
                                    rows="3"
                                    required
                                />
                            </div>

                            <div className="form-group-projects">
                                <label>Live Demo URL</label>
                                <input
                                    type="url"
                                    name="live"
                                    value={formData.links.live}
                                    onChange={handleInputChange}
                                    placeholder="https://example.com"
                                />
                            </div>

                            <div className="form-group-projects">
                                <label>Tags *</label>
                                <div className="tags-input-container">
                                    <input
                                        type="text"
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                                        placeholder="Add a tag and press Enter"
                                    />
                                    <button type="button" onClick={handleAddTag} className="btn-add-tag">
                                        Add
                                    </button>
                                </div>
                                <div className="tags-list">
                                    {formData.tags.map((tag, idx) => (
                                        <span key={idx} className="tag">
                                            {tag}
                                            <button type="button" onClick={() => handleRemoveTag(tag)}>
                                                &times;
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="form-group-projects">
                                <label>Project Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="file-input"
                                />
                                {imagePreview && (
                                    <div className="image-preview">
                                        <img src={imagePreview} alt="Preview" />
                                    </div>
                                )}
                            </div>

                            <div className="form-row">
                                <div className="form-group-projects">
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="featured"
                                            checked={formData.featured}
                                            onChange={handleInputChange}
                                        />
                                        Featured Project
                                    </label>
                                </div>

                                <div className="form-group-projects">
                                    <label>Order</label>
                                    <input
                                        type="number"
                                        name="order"
                                        value={formData.order}
                                        onChange={handleInputChange}
                                        min="0"
                                    />
                                </div>
                            </div>

                            {error && <div className="alert alert-error">{error}</div>}
                            {success && <div className="alert alert-success">{success}</div>}

                            <div className="modal-actions">
                                <button type="button" onClick={handleCloseModal} className="btn-secondary-projects">
                                    Cancel
                                </button>
                                <button type="submit" className="btn-primary">
                                    {editingProject ? 'Update Project' : 'Create Project'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectsManager;
