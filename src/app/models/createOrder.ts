export interface CreateOrder{
    ShipmentDepartDate?: Date;
    DeliveryDate?: Date;
    ReturnDate?: Date;
    IsShipped: boolean;
    IsReturned: boolean;
    ProductsId: number[];
}