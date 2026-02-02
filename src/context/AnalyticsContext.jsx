import { createContext, useContext } from 'react';
import { trackEvent as trackEventAPI } from '../services/api';

const AnalyticsContext = createContext();

export const useAnalytics = () => {
    const context = useContext(AnalyticsContext);
    if (!context) {
        // Return no-op functions if used outside provider
        return {
            trackPageView: () => { },
            trackProjectClick: () => { },
            trackCVView: () => { },
            trackCVDownload: () => { },
            trackEvent: () => { },
        };
    }
    return context;
};

export const AnalyticsProvider = ({ children }) => {
    const trackPageView = (page) => {
        const sessionKey = `pageview_${page}`;
        const hasTracked = localStorage.getItem(sessionKey);

        if (!hasTracked) {
            trackEventAPI('page_view', { page });
            localStorage.setItem(sessionKey, 'true');
        }
    };

    const trackProjectClick = (projectId, projectName) => {
        const sessionKey = `projectclick_${projectId}`;
        const hasTracked = localStorage.getItem(sessionKey);

        if (!hasTracked) {
            trackEventAPI('project_click', {
                projectId,
                projectName,
                timestamp: new Date().toISOString()
            });
            localStorage.setItem(sessionKey, 'true');
        }
    };

    const trackCVView = () => {
        const sessionKey = `cvview`;
        const hasTracked = localStorage.getItem(sessionKey);

        if (!hasTracked) {
            trackEventAPI('cv_view', {
                timestamp: new Date().toISOString()
            });
            localStorage.setItem(sessionKey, 'true');
        }
    };

    const trackCVDownload = () => {
        const sessionKey = `cvdownload`;
        const hasTracked = localStorage.getItem(sessionKey);

        if (!hasTracked) {
            trackEventAPI('cv_download', {
                timestamp: new Date().toISOString()
            });
            localStorage.setItem(sessionKey, 'true');
        }
    };

    const trackEvent = (eventType, eventData = {}) => {
        trackEventAPI(eventType, eventData);
    };

    const value = {
        trackPageView,
        trackProjectClick,
        trackCVView,
        trackCVDownload,
        trackEvent,
    };

    return (
        <AnalyticsContext.Provider value={value}>
            {children}
        </AnalyticsContext.Provider>
    );
};
