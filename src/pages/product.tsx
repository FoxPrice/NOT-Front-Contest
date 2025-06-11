import { FC } from 'react';

import { useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';

import EmptyState from '@/components/app/empty-state';
import ProductButtons from '@/components/product/buttons';
import ProductHeader from '@/components/product/header';
import ProductImages from '@/components/product/images';
import ProductInfo from '@/components/product/info';

import { CatalogItem } from '@/types/catalog-item';

import { selectProductsSlice } from '@/slice/products-slice';

const Product: FC = () => {
    const { id } = useParams();

    const product: CatalogItem | undefined = useSelector(selectProductsSlice).products.find(
        (product) => product.id === Number(id),
    );

    if (id === 'error') {
        return (
            <div className="flex flex-col h-[calc(100vh-46px)] w-full">
                <EmptyState
                    title="Not available at the moment"
                    descr="Try choosing a different product"
                />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex flex-col h-[calc(100vh-46px)] w-full">
                <EmptyState
                    title="Not available at the moment"
                    descr="Try choosing a different product"
                />
            </div>
        );
    }

    return (
        <div className="flex flex-col h-[calc(100vh-46px)] w-full">
            <ProductHeader productName={product.name} />
            <ProductInfo product={product} />
            <ProductImages imgs={product.images} productName={product.name} />
            <ProductButtons product={product} />
        </div>
    );
};

export default Product;
