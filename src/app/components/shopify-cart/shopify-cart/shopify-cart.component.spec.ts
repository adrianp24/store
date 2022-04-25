import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopifyCartComponent } from './shopify-cart.component';

describe('ShopifyCartComponent', () => {
  let component: ShopifyCartComponent;
  let fixture: ComponentFixture<ShopifyCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopifyCartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopifyCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
