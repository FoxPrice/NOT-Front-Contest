import { FC } from 'react';

/**
 * Default button component used throughout the application.
 * Provides consistent styling and behavior for primary actions.
 *
 * @component
 * @example
 * // Basic usage
 * <DefaultButton
 *   className="mt-4"
 *   text="Click me"
 *   onClick={() => console.log('clicked')}
 * />
 *
 * @param {Object} props - Component props
 * @param {string} props.className - Additional CSS classes to apply to the button
 * @param {string} props.text - Button text content
 * @param {() => void} props.onClick - Click event handler
 *
 * @returns {JSX.Element} A styled button element with consistent theming
 */
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
