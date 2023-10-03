import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteProductService {

  private apiProductUrl = 'https://localhost:7260/api/Product';

  constructor(private http: HttpClient) { }

  private isAddedToFavoriteSubject = new BehaviorSubject<boolean>(false);
  isAddedToFavorite$ = this.isAddedToFavoriteSubject.asObservable();

  private favoriteCountSubject = new BehaviorSubject<number>(0);
  favoriteCount$ = this.favoriteCountSubject.asObservable();

  private token = localStorage.getItem('token');
  private headers = new HttpHeaders({
    Authorization: 'Bearer ' + this.token?.toString()
  });

  addProductToUserFavourites(productId: number){
    return this.http.post(`${this.apiProductUrl}/AddProductToUserFavourites?productId=${productId}`, null, { headers: this.headers});
  }

  deleteFromFavourites(productId: number){
    return this.http.delete(`${this.apiProductUrl}/DeleteProductFromFavourites?productId=${productId}`, { headers: this.headers});
  }

  setAddedToFavorites(){
    this.isAddedToFavoriteSubject.next(true);

    setTimeout(() => {
      this.setNotAddedToFavorites();
    }, 5000);
  }

  setNotAddedToFavorites(){
    this.isAddedToFavoriteSubject.next(false);
  }

  setFavoriteCount(count: number){
    this.favoriteCountSubject.next(count);
  }
}
