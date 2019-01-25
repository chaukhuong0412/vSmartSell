import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupProductTypeHomeComponent } from './group-product-type-home.component';

describe('GroupProductTypeHomeComponent', () => {
  let component: GroupProductTypeHomeComponent;
  let fixture: ComponentFixture<GroupProductTypeHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupProductTypeHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupProductTypeHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
