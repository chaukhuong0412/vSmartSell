import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CongtyHomeComponent } from './company-home.component';

describe('CongtyHomeComponent', () => {
  let component: CongtyHomeComponent;
  let fixture: ComponentFixture<CongtyHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CongtyHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CongtyHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
