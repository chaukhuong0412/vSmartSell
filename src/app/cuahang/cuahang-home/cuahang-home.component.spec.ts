import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuahangHomeComponent } from './cuahang-home.component';

describe('CuahangHomeComponent', () => {
  let component: CuahangHomeComponent;
  let fixture: ComponentFixture<CuahangHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuahangHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuahangHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
