export interface ICategory {
    id: string;
    name: string;
    description: string;
}

export type CategoryMutation = Omit<ICategory, 'id'>;

export interface ILocation {
    id: string;
    name: string;
    description: string;
}

export type LocationMutation = Omit<ILocation, 'id'>;

export interface IItem {
    id: string;
    categoryId: string;
    locationId: string;
    name: string;
    description: string;
    productionDate: string;
    image: string | null;
}

export type ItemMutation = Omit<IItem, 'id'>;