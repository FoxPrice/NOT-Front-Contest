/**
 * Represents an item in the product catalog.
 * Contains detailed product information for display in the store.
 * @property {number} id - Unique product identifier
 * @property {string} name - Product name
 * @property {string} category - Product category
 * @property {string} description - Detailed product description
 * @property {number} price - Product price
 * @property {string} currency - Price currency (e.g., "TON")
 * @property {number} left - Number of items available in stock
 * @property {Object.<string, string>} tags - Key-value pairs of product tags/attributes
 * @property {string[]} images - Array of product image URLs
 */
export type CatalogItem = {
    id: number;
    name: string;
    category: string;
    description: string;
    price: number;
    currency: string;
    left: number;
    tags: {
        [key: string]: string;
    };
    images: string[];
};
