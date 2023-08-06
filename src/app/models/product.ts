export interface Product {
    id: number;
    sales: number;
    name: string;
    botanicalName: string;
    commonName: string;
    price: number;
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