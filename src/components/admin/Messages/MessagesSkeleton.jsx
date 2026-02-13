import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
const MessagesSkeleton = () => {
    return (
        <div className='message-card'>
            <div className="message-header">
                <div className="message-from">
                    <strong><Skeleton width={100} height={20} baseColor='var(--bg-gray)' /></strong>
                    <span className="message-email"><Skeleton width={100} height={20} baseColor='var(--bg-gray)' /></span>
                </div>
                <div className="message-meta">
                    <span className="message-date"><Skeleton width={100} height={20} baseColor='var(--bg-gray)' /></span>
                </div>
            </div>
            <div className="message-body">
                <Skeleton width={100} height={20} baseColor='var(--bg-gray)' />
            </div>
            <div className="message-actions">
                <Skeleton width={50} height={20} baseColor='var(--bg-gray)' />
                <Skeleton width={50} height={20} baseColor='var(--bg-gray)' />
                <Skeleton width={50} height={20} baseColor='var(--bg-gray)' />
            </div>
        </div>
    );
};
export default MessagesSkeleton;