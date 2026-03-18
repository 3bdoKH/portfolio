import { createContext, useContext, useCallback, useMemo } from 'react';
import { trackEvent as trackEventAPI } from '../services/analyticsService';

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
            trackContactFormSubmit: () => { },
            trackEvent: () => { },
        };
    }
    return context;
};

export const AnalyticsProvider = ({ children }) => {
    const trackPageView = useCallback((page) => {
        const sessionKey = `pageview_${page}`;
        const hasTracked = localStorage.getItem(sessionKey);

        if (!hasTracked) {
            trackEventAPI('page_view', { page });
            localStorage.setItem(sessionKey, 'true');
        }
    }, []);

    const trackProjectClick = useCallback((projectId, projectName) => {
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
    }, []);

    const trackCVView = useCallback(() => {
        const sessionKey = `cvview`;
        const hasTracked = localStorage.getItem(sessionKey);

        if (!hasTracked) {
            trackEventAPI('cv_view', {
                timestamp: new Date().toISOString()
            });
            localStorage.setItem(sessionKey, 'true');
        }
    }, []);

    const trackCVDownload = useCallback(() => {
        const sessionKey = `cvdownload`;
        const hasTracked = localStorage.getItem(sessionKey);

        if (!hasTracked) {
            trackEventAPI('cv_download', {
                timestamp: new Date().toISOString()
            });
            localStorage.setItem(sessionKey, 'true');
        }
    }, []);

    const trackTerminalOpen = useCallback(() => {
        const sessionKey = `terminalopen`;
        const hasTracked = localStorage.getItem(sessionKey);

        if (!hasTracked) {
            trackEventAPI('terminal_open', {
                timestamp: new Date().toISOString()
            });
            localStorage.setItem(sessionKey, 'true');
        }
    }, []);

    const trackTerminalCommand = useCallback((command, args = [], success = true) => {
        trackEventAPI('terminal_command', {
            command,
            args,
            success,
            timestamp: new Date().toISOString()
        });
    }, []);

    const trackSocialLinksClick = useCallback((socialLink) => {
        const sessionKey = `social_click_${socialLink}`;
        const hasTracked = localStorage.getItem(sessionKey);

        if (!hasTracked) {
            trackEventAPI('social_click', {
                socialLink,
                timestamp: new Date().toISOString()
            });
            localStorage.setItem(sessionKey, 'true');
        }
    }, []);

    const trackContactFormSubmit = useCallback((success, error) => {
        if (success) {
            trackEventAPI('contact_submit', {
                success: true,
                timestamp: new Date().toISOString()
            });
        } else {
            trackEventAPI('contact_submit', {
                success: false,
                error: error,
                timestamp: new Date().toISOString()
            });
        }
    }, []);

    const trackEvent = useCallback((eventType, eventData = {}) => {
        trackEventAPI(eventType, eventData);
    }, []);

    const value = useMemo(() => ({
        trackPageView,
        trackProjectClick,
        trackCVView,
        trackCVDownload,
        trackTerminalOpen,
        trackTerminalCommand,
        trackSocialLinksClick,
        trackContactFormSubmit,
        trackEvent,
    }), [
        trackPageView,
        trackProjectClick,
        trackCVView,
        trackCVDownload,
        trackTerminalOpen,
        trackTerminalCommand,
        trackSocialLinksClick,
        trackContactFormSubmit,
        trackEvent
    ]);

    return (
        <AnalyticsContext.Provider value={value}>
            {children}
        </AnalyticsContext.Provider>
    );
};
