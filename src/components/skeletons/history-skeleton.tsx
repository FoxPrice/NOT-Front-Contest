import { FC } from 'react';

const HistoryCardSkeleton: FC = () => {
    return (
        <div className="grid grid-cols-[60px_1fr] gap-[12px] items-center justify-center w-full py-[4px]">
            <div className="skeleton rounded-[12px] h-[60px] w-[60px]"></div>
            <div className="flex items-center w-full justify-between">
                <div className="flex flex-col w-full gap-[6px]">
                    <span className="skeleton rounded-[16px] w-full h-[18px]"></span>
                    <span className="skeleton rounded-[16px] w-full h-[18px]"></span>
                </div>
            </div>
        </div>
    );
};

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
