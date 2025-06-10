import { FC } from 'react';

import { useSelector } from 'react-redux';

import ProductListSkeleton from '@/components/skeletons/product-list-skeleton';
import ProductCard from '@/components/store/product-card';

import { CatalogSlice } from '@/types/stores';

import { selectProducts } from '@/slice/products-slice';

const ProductList: FC = () => {
    const productsInfo: CatalogSlice = useSelector(selectProducts);

    if (productsInfo.isLoading) {
        return <ProductListSkeleton />;
    }

    return (
        <section className="grid grid-cols-2 inner-container gap-y-[28px] gap-x-[12px]">
            {productsInfo.products.map((product) => (
                <ProductCard key={`product-card-${product.id}`} product={product} />
            ))}
        </section>
    );
};

export default ProductList;
