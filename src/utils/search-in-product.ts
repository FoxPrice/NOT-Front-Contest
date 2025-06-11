import { CatalogItem } from '@/types/catalog-item';

/**
 * Searches for a string within a product's data.
 * Performs case-insensitive search across multiple product fields:
 * - Product name
 * - Category
 * - Description
 * - Tags
 * @param {CatalogItem} product - Product to search in
 * @param {string} searchValue - Search query string
 * @returns {boolean} True if search value is found in any product field
 * @example
 * searchInProduct(product, "phone") // Returns true if "phone" is found in any field
 */
export const searchInProduct = (product: CatalogItem, searchValue: string): boolean => {
    // Return true for empty search to show all products
    if (!searchValue) return true;
    // Convert search value to lowercase for case-insensitive comparison
    const searchLower = searchValue.toLowerCase();

    // Check main product fields
    if (
        product.name.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower)
    ) {
        return true;
    }

    // Check product tags
    return Object.values(product.tags).some((tag) => tag.toLowerCase().includes(searchLower));
};
