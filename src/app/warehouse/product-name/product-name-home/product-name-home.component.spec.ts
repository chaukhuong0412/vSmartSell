import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductNameHomeComponent } from './product-name-home.component';

describe('ProductNameHomeComponent', () => {
  let component: ProductNameHomeComponent;
  let fixture: ComponentFixture<ProductNameHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductNameHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductNameHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
