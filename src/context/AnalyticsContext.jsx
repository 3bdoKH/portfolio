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
            trackTerminalOpen: () => { },
            trackTerminalCommand: () => { },
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

    const trackTerminalOpen = () => {
        const sessionKey = `terminalopen`;
        const hasTracked = localStorage.getItem(sessionKey);

        if (!hasTracked) {
            trackEventAPI('terminal_open', {
                timestamp: new Date().toISOString()
            });
            localStorage.setItem(sessionKey, 'true');
        }
    };

    const trackTerminalCommand = (command, args = [], success = true) => {
        trackEventAPI('terminal_command', {
            command,
            args,
            success,
            timestamp: new Date().toISOString()
        });
    };

    const trackSocialLinksClick = (socialLink) => {
        const sessionKey = `social_click_${socialLink}`;
        const hasTracked = localStorage.getItem(sessionKey);

        if (!hasTracked) {
            trackEventAPI('social_click', {
                socialLink,
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
        trackTerminalOpen,
        trackTerminalCommand,
        trackSocialLinksClick,
        trackEvent,
    };

    return (
        <AnalyticsContext.Provider value={value}>
            {children}
        </AnalyticsContext.Provider>
    );
};
