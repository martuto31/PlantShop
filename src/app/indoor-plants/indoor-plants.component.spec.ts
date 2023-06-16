import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndoorPlantsComponent } from './indoor-plants.component';

describe('IndoorPlantsComponent', () => {
  let component: IndoorPlantsComponent;
  let fixture: ComponentFixture<IndoorPlantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndoorPlantsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndoorPlantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
