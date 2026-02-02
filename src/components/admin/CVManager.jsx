import { useState, useEffect } from 'react';
import { uploadCV, getCVMetadata, deleteCV } from '../../services/api';
import './CVManager.css';

const CVManager = () => {
    const [cvMetadata, setCVMetadata] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        loadCVMetadata();
    }, []);

    const loadCVMetadata = async () => {
        setLoading(true);
        try {
            const response = await getCVMetadata();
            setCVMetadata(response.data);
        } catch (error) {
            // No CV uploaded yet
            setCVMetadata(null);
        } finally {
            setLoading(false);
        }
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        if (file.type !== 'application/pdf') {
            setMessage({ type: 'error', text: 'Only PDF files are allowed' });
            return;
        }

        // Validate file size (10MB)
        if (file.size > 10 * 1024 * 1024) {
            setMessage({ type: 'error', text: 'File size must be less than 10MB' });
            return;
        }

        setSelectedFile(file);
        setMessage({ type: '', text: '' });
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setMessage({ type: 'error', text: 'Please select a file first' });
            return;
        }

        setUploading(true);
        setMessage({ type: '', text: '' });

        try {
            // Convert file to base64
            const reader = new FileReader();
            reader.onload = async (e) => {
                const base64Data = e.target.result;

                const token = localStorage.getItem('adminToken');
                await uploadCV(token, {
                    filename: selectedFile.name,
                    fileData: base64Data,
                    mimeType: selectedFile.type,
                });

                setMessage({ type: 'success', text: 'CV uploaded successfully!' });
                setSelectedFile(null);
                // Reset file input
                document.getElementById('cv-file-input').value = '';
                // Reload metadata
                await loadCVMetadata();
            };

            reader.onerror = () => {
                setMessage({ type: 'error', text: 'Failed to read file' });
                setUploading(false);
            };

            reader.readAsDataURL(selectedFile);
        } catch (error) {
            setMessage({ type: 'error', text: error.message || 'Failed to upload CV' });
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete the CV? This action cannot be undone.')) {
            return;
        }

        try {
            const token = localStorage.getItem('adminToken');
            await deleteCV(token);
            setMessage({ type: 'success', text: 'CV deleted successfully' });
            setCVMetadata(null);
        } catch (error) {
            setMessage({ type: 'error', text: error.message || 'Failed to delete CV' });
        }
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).format(date);
    };

    if (loading) {
        return (
            <div className="cv-manager-loading">
                <div className="spinner-large"></div>
                <p>Loading CV data...</p>
            </div>
        );
    }

    return (
        <div className="cv-manager">
            <div className="cv-manager-header">
                <h2>CV Management</h2>
                <p className="cv-manager-subtitle">Upload and manage your CV/Resume</p>
            </div>

            {/* Message Display */}
            {message.text && (
                <div className={`cv-message cv-message-${message.type}`}>
                    {message.text}
                </div>
            )}

            {/* Current CV Info */}
            {cvMetadata && (
                <div className="cv-current-info">
                    <h3>Current CV</h3>
                    <div className="cv-info-grid">
                        <div className="cv-info-item">
                            <span className="cv-info-label">Filename:</span>
                            <span className="cv-info-value">{cvMetadata.filename}</span>
                        </div>
                        <div className="cv-info-item">
                            <span className="cv-info-label">Size:</span>
                            <span className="cv-info-value">{formatFileSize(cvMetadata.size)}</span>
                        </div>
                        <div className="cv-info-item">
                            <span className="cv-info-label">Uploaded:</span>
                            <span className="cv-info-value">{formatDate(cvMetadata.uploadedAt)}</span>
                        </div>
                    </div>
                    <button onClick={handleDelete} className="cv-delete-btn">
                        Delete CV
                    </button>
                </div>
            )}

            {/* Upload Section */}
            <div className="cv-upload-section">
                <h3>{cvMetadata ? 'Replace CV' : 'Upload CV'}</h3>
                <div className="cv-upload-area">
                    <input
                        type="file"
                        id="cv-file-input"
                        accept=".pdf"
                        onChange={handleFileSelect}
                        className="cv-file-input"
                    />
                    <label htmlFor="cv-file-input" className="cv-file-label">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="17 8 12 3 7 8" />
                            <line x1="12" y1="3" x2="12" y2="15" />
                        </svg>
                        <span className="cv-file-label-text">
                            {selectedFile ? selectedFile.name : 'Choose PDF file or drag here'}
                        </span>
                        <span className="cv-file-label-hint">Maximum file size: 10MB</span>
                    </label>
                </div>

                {selectedFile && (
                    <div className="cv-selected-file">
                        <div className="cv-selected-file-info">
                            <span className="cv-selected-file-name">{selectedFile.name}</span>
                            <span className="cv-selected-file-size">{formatFileSize(selectedFile.size)}</span>
                        </div>
                        <button
                            onClick={handleUpload}
                            disabled={uploading}
                            className="cv-upload-btn"
                        >
                            {uploading ? 'Uploading...' : cvMetadata ? 'Replace CV' : 'Upload CV'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CVManager;
