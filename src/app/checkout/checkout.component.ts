import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  selectedOption: number = 0;

  selectOption(optionIndex: number) {
      this.selectedOption = optionIndex;
  }
}
