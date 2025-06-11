import { FC, useRef } from 'react';

import { useSelector } from 'react-redux';

import EmptyState from '@/components/app/empty-state';
import HistoryCard from '@/components/profile/history-card';
import HistorySkeleton from '@/components/skeletons/history-skeleton';

import { CatalogItem } from '@/types/catalog-item';
import { HistoryItem } from '@/types/history-item';
import { CatalogSlice, HistorySlice } from '@/types/stores';

import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { selectHistorySlice } from '@/slice/history-slice';
import { selectProductsSlice } from '@/slice/products-slice';

/**
 * Number of history items to load per scroll
 */
const ITEMS_PER_LOAD: number = 25;

/**
 * History component that displays a list of past purchases with infinite scroll.
 * Shows loading state, empty state, and dynamically loads more items on scroll.
 *
 * Features:
 * - Infinite scroll pagination
 * - Loading skeleton state
 * - Empty state handling
 * - Dynamic product data matching
 * - Responsive grid layout
 * - Lazy loading of history items
 *
 * @component
 * @returns {JSX.Element} History section with purchase records or loading/empty states
 */
const History: FC = () => {
    // Get history and products data from Redux store
    const historyData: HistorySlice = useSelector(selectHistorySlice);
    const productsData: CatalogSlice = useSelector(selectProductsSlice);
    const loadMoreRef = useRef<HTMLDivElement>(null);

    const history: HistoryItem[] | null = historyData.history;
    const products: CatalogItem[] | null = productsData.products;

    // Infinite scroll hook for pagination
    const { visibleItems } = useInfiniteScroll({
        totalItems: history?.length || 0,
        itemsPerLoad: ITEMS_PER_LOAD,
        targetRef: loadMoreRef,
    });

    // Show loading skeleton while data is being fetched
    if (historyData.isLoading || productsData.isLoading) {
        return <HistorySkeleton />;
    }

    // Show empty state if no history items
    if (!history || history.length === 0) {
        return <EmptyState title="No history yet" descr="Let’s change that" />;
    }

    // Get currently visible history items
    const displayedHistory = history.slice(0, visibleItems);

    return (
        <section className="flex flex-col gap-[8px] items-center justify-center w-full pt-[40px] pb-[32px]">
            <h2 className="subtitle py-[16px] self-start">History</h2>
            <div className="flex flex-col gap-[8px] items-center justify-center w-full">
                {displayedHistory.map((item, index) => {
                    const product = products?.find((product) => product.id === item.id);
                    return (
                        <HistoryCard
                            key={`history-card-${index}`}
                            {...item}
                            product={product ?? null}
                        />
                    );
                })}
                {visibleItems < (history?.length || 0) && (
                    <div ref={loadMoreRef} className="w-full h-[20px]" />
                )}
            </div>
        </section>
    );
};

export default History;
