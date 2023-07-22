export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    lightIntensity: number;
    growDifficulty: number;
    productType: number;

    petCompatibility: boolean;
    airPurify: boolean;

    picturesData: string[];
    productSizes: string[];
    productColors: string[];
}