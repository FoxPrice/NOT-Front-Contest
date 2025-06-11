import { FC } from 'react';

const DefaultButton: FC<{ className: string; text: string; onClick: () => void }> = ({
    className,
    text,
    onClick,
}) => {
    return (
        <button
            className={`${className} flex items-center justify-center w-full h-[50px] bg-main-text-color rounded-[12px]`}
            onClick={onClick}
        >
            <span className="text-theme-color button-text">{text}</span>
        </button>
    );
};

export default DefaultButton;
