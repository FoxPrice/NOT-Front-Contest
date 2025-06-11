import { FC } from 'react';

import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import ImageWithPlaceholder from '../app/image-with-placeholder';

import productImagePlaceholder from '@/assets/img/placeholder/product.jpg';
import DeleteIcon from '@/assets/svg/cart/delete.svg?react';

import { CartItem } from '@/types/cart-item';

import { deleteFromCart } from '@/slice/cart-slice';

/**
 * Cart item component that displays product information and allows removal.
 * Renders as a clickable link to the product page with delete functionality.
 *
 * Features:
 * - Product image with placeholder
 * - Product name and category
 * - Price and quantity display
 * - Delete button with Redux integration
 * - View transition animation on navigation
 *
 * @component
 * @param {Object} props - Component props
 * @param {CartItem} props.product - Cart item data including product details
 * @returns {JSX.Element} Cart item card with product information
 */
const ItemInCart: FC<{ product: CartItem }> = ({ product }) => {
    // Extract and provide fallback values for product data
    const productName: string = product?.name ?? 'Product name';
    const productCategory: string = product?.category ?? 'Product category';
    const productImage: string | undefined = product?.images[0] ?? '';
    const productPath: string = product?.id.toString() ?? 'error';
    const total: number = product?.price ?? 0;
    const currency: string = product?.currency ?? 'NOT';
    const count: number = product?.count ?? 0;

    const dispatch = useDispatch();

    /**
     * Handles product removal from cart.
     * Prevents default link behavior and dispatches delete action
     */
    const handleDeleteFromCart = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch(deleteFromCart(product));
    };

    return (
        <Link
            to={`/product/${productPath}`}
            className="grid grid-cols-[60px_1fr] gap-[12px] items-center justify-center w-full py-[4px] no-hover"
            viewTransition
        >
            <ImageWithPlaceholder
                className="rounded-[12px] h-[60px] w-[60px]"
                src={productImage}
                alt="Avatar"
                placeholderImg={productImagePlaceholder}
            />
            <div className="flex items-center w-full justify-between gap-[20px]">
                <div className="flex flex-col items-start min-w-0 flex-1">
                    <span className="product-info text-secondary-text-color">
                        {productCategory}
                    </span>
                    <span className="text-overflow w-full">{productName}</span>
                </div>
                <div className="flex gap-[12px] items-end flex-shrink-0">
                    <span>{`${total} ${currency} ${count > 1 ? `x ${count}` : ''}`}</span>
                    <button onClick={handleDeleteFromCart} className="w-[28px] h-[28px]">
                        <DeleteIcon />
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default ItemInCart;
