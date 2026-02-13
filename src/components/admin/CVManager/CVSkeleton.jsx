import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
const CVSkeleton = () => {
    return (
        <>
            <div className="cv-current-info">
                <h3>
                    <span className="syntax-comment">{'// '}</span>
                    <span className="syntax-keyword">Current CV</span>
                </h3>
                <div className="cv-info-grid">
                    <Skeleton width={"100%"} height={45} baseColor='var(--bg-gray)' />
                    <Skeleton width={"100%"} height={45} baseColor='var(--bg-gray)' />
                    <Skeleton width={"100%"} height={45} baseColor='var(--bg-gray)' />
                </div>
                <Skeleton width={125} height={40} baseColor='var(--bg-gray)' />
            </div>
        </>
    );
};
export default CVSkeleton;