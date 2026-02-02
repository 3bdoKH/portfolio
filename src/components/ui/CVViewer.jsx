import { useEffect } from 'react';
import { getCVFile } from '../../services/api';
import { useAnalytics } from '../../context/AnalyticsContext';

const CVViewer = ({ isOpen, onClose }) => {
    const { trackCVView } = useAnalytics();

    useEffect(() => {
        if (isOpen) {
            openCVInNewTab();
        }
        // eslint-disable-next-line
    }, [isOpen]);

    const openCVInNewTab = async () => {
        try {
            // Track the view
            trackCVView();

            // Fetch CV data
            const response = await getCVFile();
            const cvData = response.data;

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

            // Create URL and open in new tab
            const url = URL.createObjectURL(blob);
            const newWindow = window.open(url, '_blank');

            if (!newWindow) {
                alert('Please allow popups to view your CV');
            }

            // Clean up after a delay
            setTimeout(() => {
                URL.revokeObjectURL(url);
            }, 1000);

        } catch (error) {
            console.error('Error opening CV:', error);
            alert('Failed to open CV: ' + (error.message || 'Unknown error'));
        } finally {
            // Close the "modal" state
            onClose();
        }
    };

    // This component doesn't render anything
    return null;
};

export default CVViewer;

