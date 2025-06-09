import { FC } from 'react';

const ProductCardSkeleton = () => {
    return (
        <div className="flex flex-col gap-[8px]">
            <div className="skeleton relative flex rounded-[16px] w-full aspect-square overflow-hidden"></div>
            <div className="flex flex-col gap-[8px]">
                <div className="skeleton text-start rounded-[16px] h-[20px] w-full"></div>
                <div className="skeleton inline-flex gap-[4px] rounded-[16px] h-[18px] w-full"></div>
            </div>
        </div>
    );
};

const ProductListSkeleton: FC = () => {
    return (
        <section className="grid grid-cols-2 inner-container gap-y-[28px] gap-x-[12px]">
            {Array.from({ length: 8 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
            ))}
        </section>
    );
};

export default ProductListSkeleton;
