import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor() { }

  private selectedOptionSubject = new BehaviorSubject<number>(-1);
  selectedOption$ = this.selectedOptionSubject.asObservable();

  selectOptionId(id: number){
    this.selectedOptionSubject.next(id);
  }
}
