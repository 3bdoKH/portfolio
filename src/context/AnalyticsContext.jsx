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
            trackEvent: () => { },
        };
    }
    return context;
};

export const AnalyticsProvider = ({ children }) => {
    const trackPageView = (page) => {
        trackEventAPI('page_view', { page });
    };

    const trackProjectClick = (projectId, projectName) => {
        trackEventAPI('project_click', {
            projectId,
            projectName,
            timestamp: new Date().toISOString()
        });
    };

    const trackEvent = (eventType, eventData = {}) => {
        trackEventAPI(eventType, eventData);
    };

    const value = {
        trackPageView,
        trackProjectClick,
        trackEvent,
    };

    return (
        <AnalyticsContext.Provider value={value}>
            {children}
        </AnalyticsContext.Provider>
    );
};
