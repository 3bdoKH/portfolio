import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
const ProjectsSkeleton = () => {
    return (
        <>
            <div className="project-item">
                <div className="project-image-container">
                    <Skeleton width={345} height={200} />
                </div>
                <div className="project-info">
                    <Skeleton width={300} height={30} baseColor='var(--bg-gray)' />
                    <Skeleton width={300} height={10} count={3} baseColor='var(--bg-gray)' />
                    <div className="project-tags">
                        <Skeleton width={94} height={40} baseColor='var(--bg-gray)' />
                        <Skeleton width={94} height={40} baseColor='var(--bg-gray)' />
                        <Skeleton width={94} height={40} baseColor='var(--bg-gray)' />
                    </div>
                </div>
                <div className="project-actions">
                    <Skeleton width={148} height={40} baseColor='var(--bg-gray)' />
                    <Skeleton width={148} height={40} baseColor='var(--bg-gray)' />
                </div>
            </div>
        </>
    );
};
export default ProjectsSkeleton;
