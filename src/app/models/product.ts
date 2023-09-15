export interface Product {
    id: number;
    sales: number;
    price: number;
    weight: number;
    name: string;
    botanicalName: string;
    commonName: string;
    description: string;
    additionalDescription: string;
    lightIntensity: number;
    growDifficulty: number;
    productType: number;

    PetCompatibility: boolean;
    AirPurify: boolean;

    picturesData: string[];
    productSizes: string[];
    productColors: string[];

    quantity: number;
}