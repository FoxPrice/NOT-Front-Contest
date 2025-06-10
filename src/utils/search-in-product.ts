import { CatalogItem } from '@/types/catalog-item';

export const searchInProduct = (product: CatalogItem, searchValue: string): boolean => {
    if (!searchValue) return true;
    const searchLower = searchValue.toLowerCase();

    if (
        product.name.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower)
    ) {
        return true;
    }

    return Object.values(product.tags).some((tag) => tag.toLowerCase().includes(searchLower));
};
