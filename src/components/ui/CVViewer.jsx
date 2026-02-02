import { useEffect, useState } from 'react';
import { getCVFile } from '../../services/api';
import { useAnalytics } from '../../context/AnalyticsContext';
import './CVViewer.css';

const CVViewer = ({ isOpen, onClose }) => {
    const [pdfUrl, setPdfUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filename, setFilename] = useState('CV.pdf');
    const { trackCVView, trackCVDownload } = useAnalytics();

    // Detect if user is on mobile
    const isMobile = () => {
        return /Android|webOS|iPhone/i.test(navigator.userAgent);
    };

    useEffect(() => {
        if (isOpen) {
            loadCV();
        } else {
            // Clean up URL when modal closes
            if (pdfUrl) {
                URL.revokeObjectURL(pdfUrl);
                setPdfUrl(null);
            }
        }
        // eslint-disable-next-line
    }, [isOpen]);

    const loadCV = async () => {
        setLoading(true);
        setError(null);

        try {
            // Track the view
            trackCVView();

            // Fetch CV data
            const response = await getCVFile();
            const cvData = response.data;
            setFilename(cvData.filename || 'CV.pdf');

            // Convert base64 to blob
            const base64Data = cvData.fileData.includes('base64,')
                ? cvData.fileData.split('base64,')[1]
                : cvData.fileData;

            const byteCharacters = atob(base64Data);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'application/pdf' });

            // Create object URL
            const url = URL.createObjectURL(blob);

            // On mobile, open in new tab directly instead of iframe
            if (isMobile()) {
                window.open(url, '_blank');
                // Clean up and close modal
                setTimeout(() => {
                    URL.revokeObjectURL(url);
                    onClose();
                }, 1000);
            } else {
                // On desktop, use iframe
                setPdfUrl(url);
            }

        } catch (err) {
            console.error('Error loading CV:', err);
            setError(err.message || 'Failed to load CV');
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = () => {
        if (!pdfUrl) return;

        // Track download in analytics
        trackCVDownload();

        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (!isOpen) return null;

    return (
        <div className="cv-viewer-overlay" onClick={onClose}>
            <div className="cv-viewer-modal" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="cv-viewer-header">
                    <div className="cv-header-left">
                        <span className="code-comment">{`// ${filename}`}</span>
                    </div>
                    <div className="cv-header-right">
                        <button
                            className="cv-header-btn"
                            onClick={handleDownload}
                            disabled={!pdfUrl}
                        >
                            <span className="code-function">download</span>
                            <span className="code-bracket">()</span>
                        </button>
                        <button className="cv-close-btn" onClick={onClose}>
                            <span className="code-bracket">×</span>
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="cv-viewer-content">
                    {loading && (
                        <div className="cv-loading">
                            <div className="spinner"></div>
                            <p className="code-comment">{'// Loading CV...'}</p>
                        </div>
                    )}

                    {error && (
                        <div className="cv-error">
                            <span className="code-keyword">Error:</span>
                            <span className="code-string"> "{error}"</span>
                        </div>
                    )}

                    {!loading && !error && pdfUrl && (
                        <iframe
                            src={pdfUrl}
                            className="cv-iframe"
                            title="CV Preview"
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default CVViewer;
