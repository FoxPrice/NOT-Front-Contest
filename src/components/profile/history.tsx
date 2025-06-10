import { FC, useEffect, useRef, useState, useCallback } from 'react';

import { useSelector } from 'react-redux';

import HistoryCard from '@/components/profile/history-card';
import HistoryEmptyState from '@/components/profile/history-empty-state';
import HistorySkeleton from '@/components/skeletons/history-skeleton';

import { CatalogItem } from '@/types/catalog-item';
import { HistoryItem } from '@/types/history-item';
import { CatalogSlice, HistorySlice } from '@/types/stores';

import { selectHistory } from '@/slice/history-slice';
import { selectProducts } from '@/slice/products-slice';

const ITEMS_PER_LOAD = 25;

type IntersectionCallback = (entries: IntersectionObserverEntry[]) => void;

const History: FC = () => {
    const historyData: HistorySlice = useSelector(selectHistory);
    const productsData: CatalogSlice = useSelector(selectProducts);
    const [visibleItems, setVisibleItems] = useState<number>(ITEMS_PER_LOAD);
    const loadMoreRef = useRef<HTMLDivElement>(null);

    const history: HistoryItem[] | null = historyData.history;
    const products: CatalogItem[] | null = productsData.products;

    const loadMore = useCallback((): void => {
        if (history) {
            setVisibleItems((prev) => Math.min(prev + ITEMS_PER_LOAD, history.length));
        }
    }, [history]);

    useEffect(() => {
        const observerCallback: IntersectionCallback = (entries) => {
            const target = entries[0];
            if (target.isIntersecting && history && visibleItems < history.length) {
                loadMore();
            }
        };

        const observer = new IntersectionObserver(observerCallback, { threshold: 0.1 });

        const currentElement = loadMoreRef.current;

        if (currentElement) {
            observer.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                observer.unobserve(currentElement);
            }
        };
    }, [history, visibleItems, loadMore]);

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
