import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupProductTypeEditComponent } from './group-product-type-edit.component';

describe('GroupProductTypeEditComponent', () => {
  let component: GroupProductTypeEditComponent;
  let fixture: ComponentFixture<GroupProductTypeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupProductTypeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupProductTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
