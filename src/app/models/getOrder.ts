import { Product } from "./product";

export interface GetOrder{
    ShipmentDepartDate?: Date;
    DeliveryDate?: Date;
    ReturnDate?: Date;
    IsShipped: boolean;
    IsReturned: boolean;
    Products: Product[];
}