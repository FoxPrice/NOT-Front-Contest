import { FC, useRef } from 'react';

import { useSelector } from 'react-redux';

import HistoryEmptyState from '@/components/emptyState/history-empty-state';
import HistoryCard from '@/components/profile/history-card';
import HistorySkeleton from '@/components/skeletons/history-skeleton';

import { CatalogItem } from '@/types/catalog-item';
import { HistoryItem } from '@/types/history-item';
import { CatalogSlice, HistorySlice } from '@/types/stores';

import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { selectHistorySlice } from '@/slice/history-slice';
import { selectProductsSlice } from '@/slice/products-slice';

const ITEMS_PER_LOAD: number = 25;

const History: FC = () => {
    const historyData: HistorySlice = useSelector(selectHistorySlice);
    const productsData: CatalogSlice = useSelector(selectProductsSlice);
    const loadMoreRef = useRef<HTMLDivElement>(null);

    const history: HistoryItem[] | null = historyData.history;
    const products: CatalogItem[] | null = productsData.products;

    const { visibleItems } = useInfiniteScroll({
        totalItems: history?.length || 0,
        itemsPerLoad: ITEMS_PER_LOAD,
        targetRef: loadMoreRef,
    });

    if (historyData.isLoading || productsData.isLoading) {
        return <HistorySkeleton />;
    }

    if (!history || history.length === 0) {
        return <HistoryEmptyState />;
    }

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
