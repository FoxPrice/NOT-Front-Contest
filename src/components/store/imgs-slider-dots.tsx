import { FC } from 'react';

const ProductImgs: FC<{ length: number; activeDotIndex: number; className?: string }> = ({
    length,
    activeDotIndex,
    className,
}) => {
    return (
        <div className={`${className} flex gap-[3px]`}>
            {Array.from({ length }).map((_, index) => (
                <div
                    key={index}
                    className={`h-[4px] transition-all duration-300 ${index === activeDotIndex ? 'w-[20px] bg-white rounded-[4px]' : 'w-[4px] rounded-full bg-white/5 '}`}
                />
            ))}
        </div>
    );
};

export default ProductImgs;
