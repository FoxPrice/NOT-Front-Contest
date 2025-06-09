import { FC } from 'react';

import Header from '@/components/store/header';
import ProductList from '@/components/store/product-list';

const Store: FC = () => {
    return (
        <div className="flex flex-col gap-[8px]">
            <Header />
            <ProductList />
        </div>
    );
};

export default Store;
