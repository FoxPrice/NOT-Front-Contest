import { FC, ReactElement } from 'react';

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
