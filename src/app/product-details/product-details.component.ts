import { Component, OnInit } from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    new Swiper('.swiper-container', {
      slidesPerView: 1,
      spaceBetween: 3,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  }
}
