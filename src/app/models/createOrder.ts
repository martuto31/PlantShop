export interface CreateOrder{
    Name: string;
    Surname: string;
    Address: string;
    City: string;
    Region: string;
    PostalCode: string;
    PhoneNumber: string;
    OrderTotal: number;
    OrderWeight: number;
    ProductsId: number[];
}