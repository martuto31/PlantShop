import { Component, OnInit } from '@angular/core';
import { DropdownItem } from '../models/dropdownItem';

@Component({
  selector: 'app-indoor-plants',
  templateUrl: './indoor-plants.component.html',
  styleUrls: ['./indoor-plants.component.css']
})
export class IndoorPlantsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {}

  dropdownItems: DropdownItem[] = [{id: 0, label: 'Големина'}, {id: 1, label: 'Светлина'}, {id: 2, label: 'Домашни любимци'},
                                   {id: 3, label: 'Пречистване на въздуха'}, {id: 4, label: 'Трудност за отглеждане'}, {id: 5, label: 'Цвят'}, {id: 6, label: 'Цена'}]
  private dropdownLength = this.dropdownItems.length;
  showDropdown: boolean[] = Array(this.dropdownLength).fill(false);
  isChecked: boolean = true;

  toggleDropdown(id: number){
    if(this.showDropdown[id] === false){
      this.showDropdown.fill(false);
      this.showDropdown[id] = true;
    }
    else{
      this.showDropdown[id] = false;
    }
  }
}
