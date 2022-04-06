import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopifyProductDetailsComponent } from './shopify-product-details.component';

describe('ShopifyProductDetailsComponent', () => {
  let component: ShopifyProductDetailsComponent;
  let fixture: ComponentFixture<ShopifyProductDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopifyProductDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopifyProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
