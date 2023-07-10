import { Component, OnInit } from '@angular/core';
import { DropdownItem } from '../models/dropdownItem';

@Component({
  selector: 'app-indoor-plants',
  templateUrl: './indoor-plants.component.html',
  styleUrls: ['./indoor-plants.component.css']
})
export class IndoorPlantsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    document.body.addEventListener('click', this.onDocumentClick);
  }

  ngOnDestroy() {
    document.body.removeEventListener('click', this.onDocumentClick);
  }

  dropdownItems: DropdownItem[] = [{id: 0, label: 'Големина'}, {id: 1, label: 'Светлина'}, {id: 2, label: 'Домашни любимци'},
                                   {id: 3, label: 'Пречистване на въздуха'}, {id: 4, label: 'Трудност за отглеждане'}, {id: 5, label: 'Цвят'}, {id: 6, label: 'Цена'}];
  private dropdownLength = this.dropdownItems.length;
  showDropdown: boolean[] = Array(this.dropdownLength).fill(false);
  isChecked: boolean = true;
  isSortDropdownOpen: boolean = false;
  isMobileSortActive: boolean = false;
  activeItem: number = 0;
  selectedText: string = 'Препоръчани';

  onItemClick(index: number, text: string) {
    this.activeItem = index;
    this.selectedText = text;
    this.isSortDropdownOpen = false;
  }

  toggleNavDropdown(id: number){
    if(this.showDropdown[id] === false){
      this.showDropdown.fill(false);
      this.showDropdown[id] = true;
    }
    else{
      this.showDropdown[id] = false;
    }
  }

  toggleMobileSort(){
    setTimeout(() => {
      this.isMobileSortActive = !this.isMobileSortActive;
    }, 10);
  }

  toggleSortDropdown(){
    this.isSortDropdownOpen = !this.isSortDropdownOpen;
    
    var el = document.getElementById("not-selected") as HTMLInputElement;

    el.style.display = 'block';
  }

  onDocumentClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    var el = document.getElementById("not-selected") as HTMLInputElement;

    if (!target.closest('.sort')) {
      this.isSortDropdownOpen = false;
    }
  }
}
