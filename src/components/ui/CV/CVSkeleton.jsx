import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CVSkeleton = ({ onClose }) => {
    return (
        <SkeletonTheme baseColor="var(--bg-overlay)" highlightColor="var(--border-color)">
            <div className="cv-viewer-modal" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="cv-viewer-header">
                    <div className="cv-header-left">
                        <span className="code-comment">{`// `}</span>
                        <Skeleton width={120} height={20} />
                    </div>
                    <div className="cv-header-right">
                        <div className="cv-header-btn" style={{ padding: '4px 12px', opacity: 0.7 }}>
                            <Skeleton width={80} height={16} />
                        </div>
                        <button className="cv-close-btn" onClick={onClose}>
                            <span className="code-bracket">×</span>
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="cv-viewer-content">
                    <div className="cv-document-skeleton" style={{ width: '100%', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px', padding: '40px', boxSizing: 'border-box' }}>
                        {/* Header Area */}
                        <div style={{ marginBottom: '30px' }}>
                            <Skeleton width="60%" height={32} />
                            <Skeleton width="40%" height={20} style={{ marginTop: '10px' }} />
                        </div>

                        <div style={{ display: 'flex', gap: '40px' }}>
                            {/* Sidebar Column */}
                            <div style={{ flex: '0 0 30%' }}>
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} style={{ marginBottom: '25px' }}>
                                        <Skeleton width="100%" height={18} />
                                        <div style={{ marginTop: '8px' }}>
                                            <Skeleton width="80%" height={12} />
                                            <Skeleton width="90%" height={12} style={{ marginTop: '5px' }} />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Main Column */}
                            <div style={{ flex: '1' }}>
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} style={{ marginBottom: '30px' }}>
                                        <Skeleton width="40%" height={24} />
                                        <div style={{ marginTop: '12px' }}>
                                            <Skeleton width="100%" height={14} count={3} style={{ marginBottom: '8px' }} />
                                            <Skeleton width="70%" height={14} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </SkeletonTheme>
    );
};

export default CVSkeleton;
