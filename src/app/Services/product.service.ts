import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { ProductSizes } from '../models/productSizes';
import { ProductColors } from '../models/productColors';
import { PlantFilters } from '../models/plantFilters';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiProductUrl = 'https://localhost:7260/api/Product';

  constructor(private http: HttpClient) { }

  private token = localStorage.getItem('token');
  private headers = new HttpHeaders({
    Authorization: 'Bearer ' + this.token?.toString()
  });

  getAllProductsByType(type: string, skipCount: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiProductUrl}/GetProductsByType?type=${type}&skipCount=${skipCount}`);
  }

  getAllFilteredProducts(filters: PlantFilters, skipCount: number, sortType: string) : Observable<Product[]> {
    return this.http.post<Product[]>(`${this.apiProductUrl}/GetFilteredAndSortedProductsAsync?skipCount=${skipCount}&sortType=${sortType}`, filters);
  }

  getAllUserFavouriteProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.apiProductUrl}/GetAllUserFavouriteProducts`, { headers: this.headers});
  }
  
  getNewestProducts(type: string, skipCount: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiProductUrl}/GetNewestProducts?type=${type}&skipCount=${skipCount}`);
  }

  getMostSoldProducts(type: string, skipCount: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiProductUrl}/GetMostSoldProducts?type=${type}&skipCount=${skipCount}`);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiProductUrl}/GetProductById?id=${id}`);
  }
  
  getAllProductSizes(): Observable<ProductSizes[]> {
    return this.http.get<ProductSizes[]>(`${this.apiProductUrl}/GetAllProductSizes`);
  }

  getAllProductColors(): Observable<ProductColors[]>{
    return this.http.get<ProductColors[]>(`${this.apiProductUrl}/GetAllProductColors`);
  }

  hasMoreProducts(filters: PlantFilters, skipCount: number, sortType: string){
    return this.http.post<boolean>(`${this.apiProductUrl}/HasMoreProducts?skipCount=${skipCount}&sortType=${sortType}`, filters);
  }

  addProduct(formData: FormData) {
    return this.http.post(`${this.apiProductUrl}/AddProduct`, formData, { headers: this.headers});
  }

  editProduct(formData: FormData){
    return this.http.put(`${this.apiProductUrl}/UpdateProduct`, formData, { headers: this.headers});
  }

  deleteProduct(id: number){
    return this.http.delete(`${this.apiProductUrl}/RemoveProduct?id=${id}`, { headers: this.headers});
  }
  
  getBase64ImageUrl(base64String: string): string {
    return `data:image/jpeg;base64,${base64String}`;
  }
}
