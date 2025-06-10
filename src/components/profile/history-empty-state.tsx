import { FC } from 'react';

const HistoryEmptyState: FC = () => {
    return (
        <section className="flex flex-col gap-[8px] items-center justify-center w-full h-full">
            <h2 className="title">No history yet</h2>
            <span className="placeholder-description">Let’s change that</span>
        </section>
    );
};

export default HistoryEmptyState;
