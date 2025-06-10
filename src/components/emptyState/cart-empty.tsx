import { FC } from 'react';

const CartEmptyState: FC = () => {
    return (
        <div className="flex flex-col gap-[8px] items-center justify-center w-full h-full">
            <h2 className="title">Cart’s cold</h2>
            <span className="placeholder-description text-secondary-text-color">No items yet</span>
        </div>
    );
};

export default CartEmptyState;
