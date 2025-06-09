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
