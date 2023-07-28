import { Component, OnInit } from '@angular/core';
import { ProductSizes } from '../models/productSizes';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../Services/product.service';
import { Product } from '../models/product';
import { ProductColors } from '../models/productColors';
import { ProductTarget } from '../models/productTarget';
import { ProductTypes } from '../models/productType';
import { ProductTypeConstants } from '../models/productTypeConstants';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  product: Product = {name: '', id: 0, price: 0, description: '', productType: 0, AirPurify: false, PetCompatibility: false,
                      growDifficulty: 1, lightIntensity: 1, picturesData: [], productSizes: [], productColors: []};

  showSuccessMessage: boolean = false;

  productSizes: ProductSizes[] = [];
  selectedSizes: ProductSizes[] = [];

  productColors: ProductColors[] = [];
  selectedColors: ProductColors[] = [];

  productTypes: ProductTypes[] = [
    {id: 1, type: ProductTypeConstants.IndoorPlants},
    {id: 2, type: ProductTypeConstants.OutdoorPlants}
  ];
  selectedType: ProductTypes = {id: 0, type: ''};

  productLightIntensities: ProductTypes[] = [{id: 1, type: 'Малко/Изкуствена'}, {id: 2, type: 'Частична'}, {id: 3, type: 'Директна светлина'}];
  selectedLightIntensity: ProductTypes = {id: 0, type: ''};

  productGrowDifficulties: ProductTypes[] = [{id: 1, type: 'Лесно'}, {id: 2, type: 'Средно'}, {id: 3, type: 'Трудно'}];
  selectedGrowDifficulty: ProductTypes = {id: 0, type: ''};

  selectedImages: FileList | null = null;
  productForm: FormGroup;

  constructor(private productService: ProductService, private formBuilder: FormBuilder) {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      sizes: this.formBuilder.array([])
    });
   }

  ngOnInit(): void {
    this.getProductSizes();
    this.getProductColors();
  }

  onSubmit(): void {
    const formData: FormData = new FormData();
    formData.append('name', this.product.name);
    formData.append('description', this.product.description);
    formData.append('price', this.product.price.toString());
    formData.append('productType', this.selectedType.id.toString());
    formData.append('airPurify', this.product.AirPurify.toString());
    formData.append('petCompatibility', this.product.PetCompatibility.toString());
    formData.append('lightIntensity', this.selectedLightIntensity.id.toString());
    formData.append('growDifficulty', this.selectedGrowDifficulty.id.toString());

    if (this.selectedImages && this.selectedImages.length > 0) {
      for (let i = 0; i < this.selectedImages.length; i++) {
        formData.append('images', this.selectedImages[i]);
      }
    }

    if(this.selectedColors && this.selectedColors.length > 0){
      for(let i = 0; i < this.selectedColors.length; i++){
        formData.append('productColors', this.selectedColors[i].id.toString())
      }
    }

    if(this.selectedSizes && this.selectedSizes.length > 0){
      for(let i = 0; i < this.selectedSizes.length; i++){
        formData.append('productSizes', this.selectedSizes[i].id.toString())
      }
    }

    this.productService.addProduct(formData).subscribe(
      (response) => {
        this.showSuccessMessage = true;

        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 2000);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  
  onFileChange(event: any): void {
    this.selectedImages = event.target.files;
  }

  getProductById(id: number): any{
    this.productService.getProductById(id).subscribe((product: Product) =>{
      this.product = product;
    });
  }

  getProductSizes(): any{
    this.productService.getAllProductSizes().subscribe((productSizes: ProductSizes[]) => {
      this.productSizes = productSizes;
    })
  }

  getProductColors(): any{
    this.productService.getAllProductColors().subscribe((productColors: ProductColors[]) => {
      this.productColors = productColors;
    })
  }
}
