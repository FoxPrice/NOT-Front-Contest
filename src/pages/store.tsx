import { FC } from 'react';

import Cart from '@/components/store/cart';
import Header from '@/components/store/header';
import ProductList from '@/components/store/product-list';

const Store: FC = () => {
    return (
        <div className="grid grid-rows-[60px_1fr] gap-[8px] w-full">
            <Header />
            <ProductList />
            <Cart />
        </div>
    );
};

export default Store;
