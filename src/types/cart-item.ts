/**
 * Represents an item in the shopping cart.
 * Contains product information and quantity.
 * @property {number} id - Unique product identifier
 * @property {string} name - Product name
 * @property {string} category - Product category
 * @property {number} price - Product price
 * @property {string} currency - Price currency (e.g., "TON")
 * @property {number} left - Number of items available in stock
 * @property {string[]} images - Array of product image URLs
 * @property {number} count - Quantity of items in cart
 */
export type CartItem = {
    id: number;
    name: string;
    category: string;
    price: number;
    currency: string;
    left: number;
    images: string[];
    count: number;
};
