import { FC } from 'react';

import NotFoundIcon from '~/store/not-found.svg?react';

const StoreEmptyState: FC<{ type: 'not-found' | 'no-products' }> = ({ type }) => {
    return (
        <section className="flex flex-col gap-[8px] items-center justify-center w-full h-full">
            <NotFoundIcon />
            <h2 className="title">{type === 'not-found' ? 'Not Found' : 'No products yet'}</h2>
            <span className="placeholder-description text-secondary-text-color">
                {type === 'not-found'
                    ? 'This style doesn’t exist'
                    : 'The store will be restocked with merchandise soon'}
            </span>
        </section>
    );
};

export default StoreEmptyState;
