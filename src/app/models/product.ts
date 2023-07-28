export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    lightIntensity: number;
    growDifficulty: number;
    productType: number;

    PetCompatibility: boolean;
    AirPurify: boolean;

    picturesData: string[];
    productSizes: string[];
    productColors: string[];
}