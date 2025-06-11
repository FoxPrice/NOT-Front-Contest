import { FC } from 'react';

/**
 * Skeleton component for a single history card item.
 * Displays loading state animation for product image and details.
 *
 * Features:
 * - Grid layout matching actual history card
 * - Animated skeleton loading state
 * - Responsive design
 * - Placeholder for product image and text
 *
 * @component
 * @returns {JSX.Element} Skeleton card with loading animation
 */
const HistoryCardSkeleton: FC = () => {
    return (
        <div className="grid grid-cols-[60px_1fr] gap-[12px] items-center justify-center w-full py-[4px]">
            {/* Product image skeleton */}
            <div className="skeleton rounded-[12px] h-[60px] w-[60px]"></div>
            {/* Product details skeleton */}
            <div className="flex items-center w-full justify-between">
                <div className="flex flex-col w-full gap-[6px]">
                    {/* Product name skeleton */}
                    <span className="skeleton rounded-[16px] w-full h-[18px]"></span>
                    {/* Product metadata skeleton */}
                    <span className="skeleton rounded-[16px] w-full h-[18px]"></span>
                </div>
            </div>
        </div>
    );
};

/**
 * Skeleton component for the entire history section.
 * Shows loading state for multiple history cards while data is being fetched.
 *
 * Features:
 * - Multiple history card skeletons
 * - Section title placeholder
 * - Consistent spacing and layout
 * - Matches actual history section structure
 *
 * @component
 * @returns {JSX.Element} History section skeleton with multiple card placeholders
 */
const HistorySkeleton: FC = () => {
    return (
        <section className="flex flex-col gap-[8px] items-center justify-center w-full pt-[40px] pb-[32px]">
            <h2 className="subtitle py-[16px] self-start h-[56px]"></h2>
            <div className="flex flex-col gap-[8px] items-center justify-center w-full">
                {Array.from({ length: 8 }).map((_, index) => (
                    <HistoryCardSkeleton key={`history-card-skeleton-${index}`} />
                ))}
            </div>
        </section>
    );
};

export default HistorySkeleton;
