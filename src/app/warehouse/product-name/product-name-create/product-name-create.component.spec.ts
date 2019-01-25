import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductNameCreateComponent } from './product-name-create.component';

describe('ProductNameCreateComponent', () => {
  let component: ProductNameCreateComponent;
  let fixture: ComponentFixture<ProductNameCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductNameCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductNameCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
