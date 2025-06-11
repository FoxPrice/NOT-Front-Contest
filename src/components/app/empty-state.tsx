import { FC, ReactElement } from 'react';

/**
 * Empty state component used to display a message when there is no content to show.
 * Supports an optional icon to enhance visual communication.
 *
 * @component
 * @example
 * // Basic usage without icon
 * <EmptyState
 *   title="No items found"
 *   descr="Try adjusting your search criteria"
 * />
 *
 * @example
 * // Usage with icon
 * <EmptyState
 *   title="No purchases yet"
 *   descr="Your purchase history will appear here"
 *   icon={<ShoppingCartIcon className="w-12 h-12" />}
 * />
 *
 * @param {Object} props - Component props
 * @param {string} props.title - Main heading text
 * @param {string} props.descr - Descriptive text explaining the empty state
 * @param {ReactElement<React.SVGProps<SVGSVGElement>>} [props.icon] - Optional SVG icon to display
 *
 * @returns {JSX.Element} A centered section with icon (if provided), title, and description
 */
const EmptyState: FC<{
    title: string;
    descr: string;
    icon?: ReactElement<React.SVGProps<SVGSVGElement>>;
}> = ({ title, descr, icon }) => {
    return (
        <section className="flex flex-col gap-[8px] items-center justify-center w-full h-full">
            {icon ?? null}
            <h2 className="title">{title}</h2>
            <span className="placeholder-description text-secondary-text-color">{descr}</span>
        </section>
    );
};

export default EmptyState;
