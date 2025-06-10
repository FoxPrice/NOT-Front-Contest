import { FC } from 'react';

import { useSelector } from 'react-redux';

import StoreEmptyState from '@/components/emptyState/store-empty-state';
import ProductListSkeleton from '@/components/skeletons/product-list-skeleton';
import ProductCard from '@/components/store/product-card';

import { searchInProduct } from '@/utils/search-in-product';

import { CatalogSlice } from '@/types/stores';

import { selectBaseSlice } from '@/slice/base-slide';
import { selectProductsSlice } from '@/slice/products-slice';

const ProductList: FC = () => {
    const productsInfo: CatalogSlice = useSelector(selectProductsSlice);
    const productSearchValue: string = useSelector(selectBaseSlice).searchInputValue;

    if (productsInfo.isLoading) {
        return <ProductListSkeleton />;
    }

    if (productsInfo.products.length === 0) {
        return <StoreEmptyState type={'no-products'} />;
    }

    const filteredProducts = productsInfo.products.filter((product) =>
        searchInProduct(product, productSearchValue),
    );

    if (filteredProducts.length === 0) {
        return <StoreEmptyState type={'not-found'} />;
    }

    return (
        <section className="grid grid-cols-2 inner-container gap-y-[28px] gap-x-[12px]">
            {filteredProducts.map((product) => (
                <ProductCard key={`product-card-${product.id}`} product={product} />
            ))}
        </section>
    );
};

export default ProductList;
