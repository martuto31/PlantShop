import { Component, OnInit } from '@angular/core';
import { DropdownItem } from '../models/dropdownItem';
import { Router } from '@angular/router';
import { ProductService } from '../Services/product.service';
import { Product } from '../models/product';
import { ProductTypeConstants } from '../models/productTypeConstants';
import { ProductFilterConstants } from '../models/productFilterConstants';
import { PlantFilters } from '../models/plantFilters';
import { filter, skip } from 'rxjs';
import { Cart } from '../models/cart';
import { SortTypeConstants } from '../models/sortTypeConstants';

@Component({
  selector: 'app-indoor-plants',
  templateUrl: './indoor-plants.component.html',
  styleUrls: ['./indoor-plants.component.css']
})
export class IndoorPlantsComponent implements OnInit {

  constructor(private router: Router, private productService: ProductService) { }

  products: Product[] = [];
  cart: Cart = { products: [] };
  skipCount: number = 0;
  ProductType: string = ProductTypeConstants.IndoorPlants;
  SortType: typeof SortTypeConstants = SortTypeConstants;
  selectedSortType: string = '';

  filters: PlantFilters = {lightIntensities: [], sizes: [], petCompatibility: false, airPurifiable: false, colors: [], growDifficulties: [], productType: 1};
  sizeFilterFlags: boolean[] = Array(ProductFilterConstants.Sizes).fill(false);
  lightFilterFlags: boolean[] = Array(ProductFilterConstants.LightIntesities).fill(false);
  petFilterFlag: boolean[] = Array(1).fill(false);
  airPurifyFilterFlag: boolean[] = Array(1).fill(false);
  growDifficultyFilterFlags: boolean[] = Array(ProductFilterConstants.GrowDifficulties).fill(false);
  colorsFilterFlags: boolean[] = Array(ProductFilterConstants.Colors).fill(false);

  ngOnInit() {
    document.body.addEventListener('click', this.onDocumentClick);
    this.GetProducts();

    const storedCart = localStorage.getItem('cart');
    if(storedCart != null){
      this.cart = storedCart ? JSON.parse(storedCart) : [];
    }
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

  public GetFilteredProducts(filter: PlantFilters, skipCount: number, sortType: string){
    this.productService.getAllFilteredProducts(this.filters, skipCount, sortType).subscribe((products: Product[]) =>
    {
      products.forEach((product: Product) => {
        this.products.push(product);
      });
    })
  }

  public GetProducts(){
    this.productService.getAllProductsByType(this.ProductType, this.skipCount).subscribe((products: Product[]) =>{
      products.forEach((product: Product) => {
        this.products.push(product);
      });
    })
  }
  
  LoadFilteredProducts(){
    this.GetFilteredProducts(this.filters, this.skipCount, this.selectedSortType);
  }

  LoadFilteredProductsWithSort(sortType: string){
    this.GetFilteredProducts(this.filters, this.skipCount, sortType);

    this.selectedSortType = sortType;
  }

  resetProductsAndSkipCount(){
    this.products = [];
    this.skipCount = 0;
  }

  addToCart(product: Product): void {
    this.cart.products.push(product);

    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  toggleFilterFlag(filterType: string, index: number) {
    switch(filterType){
      case "Sizes":
        this.sizeFilterFlags[index] = !this.sizeFilterFlags[index];
        break;
      
      case "LightIntensities":
        this.lightFilterFlags[index] = !this.lightFilterFlags[index];
        break;

      case "Colors":
        this.colorsFilterFlags[index] = !this.colorsFilterFlags[index];
        break;

      case "GrowDifficulties":
        this.growDifficultyFilterFlags[index] = !this.growDifficultyFilterFlags[index];
        break;

      case "PetCompatibility":
        this.petFilterFlag[index] = !this.petFilterFlag[index];
        break;

      case "AirPurifiable":
        this.airPurifyFilterFlag[index] = !this.airPurifyFilterFlag[index];
        break;
    }
    // console.log("After switch: " + this.filters.sizes + " " + this.sizeFilterFlags);
  }
  
  applyFilter(filterFlags: boolean[], filterType: string){
    switch(filterType){
      case "Sizes":
        this.filters.sizes = [];

        for(let i = 0; i < filterFlags.length; i++){
          if(filterFlags[i]){
            this.filters.sizes.push(i+1); // adds the index of the corresponding size from the productSize enum to the filter
          }
        }
        break;
      
      case "LightIntensities":
        this.filters.lightIntensities = [];

        for(let i = 0; i < filterFlags.length; i++){
          if(filterFlags[i]){
            this.filters.lightIntensities.push(i+1); // adds the index of the corresponding size from the productSize enum to the filter
          }
        }
        break;

      case "Colors":
        this.filters.colors = [];

        for(let i = 0; i < filterFlags.length; i++){
          if(filterFlags[i]){
            this.filters.colors.push(i+1); // adds the index of the corresponding size from the productSize enum to the filter
          }
        }
        break;

      case "GrowDifficulties":
        this.filters.growDifficulties = [];

        for(let i = 0; i < filterFlags.length; i++){
          if(filterFlags[i]){
            this.filters.growDifficulties.push(i+1); // adds the index of the corresponding size from the productSize enum to the filter
          }
        }
        break;

      case "PetCompatibility":
        this.filters.petCompatibility = false;

        for(let i = 0; i < filterFlags.length; i++){
          if(filterFlags[i]){
            this.filters.petCompatibility = true;
          }
        }
        break;

      case "AirPurifiable":
        this.filters.airPurifiable = false;

        for(let i = 0; i < filterFlags.length; i++){
          if(filterFlags[i]){
            this.filters.airPurifiable = true;
          }
        }
        break;
    }

    this.resetProductsAndSkipCount();
    this.LoadFilteredProducts();
  }

  showMore(){
    this.skipCount = this.products.length;
    this.GetProducts();
  }

  getBase64ImageUrl(base64String: string): string {
    return `data:image/jpeg;base64,${base64String}`;
  }

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
    }, 1);
  }

  toggleSortDropdown(){
    this.isSortDropdownOpen = !this.isSortDropdownOpen;
    
    // var el = document.getElementById("not-selected") as HTMLInputElement;

    // el.style.display = 'block';
  }

  redirectToDetails(id: number){
    this.router.navigate(['/Product/' + id])
  }

  onDocumentClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    var el = document.getElementById("not-selected") as HTMLInputElement;

    if (!target.closest('.sort')) {
      this.isSortDropdownOpen = false;
    }
  }
}
