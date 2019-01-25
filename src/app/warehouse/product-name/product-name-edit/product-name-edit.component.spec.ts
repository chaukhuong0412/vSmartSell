import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductNameEditComponent } from './product-name-edit.component';

describe('ProductNameEditComponent', () => {
  let component: ProductNameEditComponent;
  let fixture: ComponentFixture<ProductNameEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductNameEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductNameEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
