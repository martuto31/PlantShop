export interface PlantFilters{
    lightIntensities: number[]; // An array of light sensitivity values (low, medium, high)
    sizes: number[]; // An array of size values (small, medium, big, large)
    petCompatibility: boolean;
    airPurifiable: boolean;
    colors: number[]; // An array of color values
    growDifficulties: number[];
    productType: number; // Indoor/Outdoor 
}