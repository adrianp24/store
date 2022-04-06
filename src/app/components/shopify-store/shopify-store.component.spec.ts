import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopifyStoreComponent } from './shopify-store.component';

describe('ShopifyStoreComponent', () => {
  let component: ShopifyStoreComponent;
  let fixture: ComponentFixture<ShopifyStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopifyStoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopifyStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
