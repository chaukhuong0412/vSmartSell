import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreHomeComponent } from './store-home.component';

describe('CuahangHomeComponent', () => {
  let component: StoreHomeComponent;
  let fixture: ComponentFixture<StoreHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
