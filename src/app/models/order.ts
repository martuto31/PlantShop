import { Product } from "./product";

export interface Order{
    ShipmentDepartDate?: Date;
    DeliveryDate?: Date;
    ReturnDate?: Date;
    IsShipped: boolean;
    IsReturned: boolean;
    ProductsId: number[];
}