import { Product } from "./product";

export interface GetOrder{
    name: string;
    surname: string;
    address: string;
    city: string;
    region: string;
    postalCode: string;
    phoneNumber: string;
    orderTotal: number;
    orderWeight: number;
    orderCreatedOn: Date;
    shipmentDepartDate?: Date;
    deliveryDate?: Date;
    returnDate?: Date;
    isShipped: boolean;
    isReturned: boolean;
    products: Product[];
}