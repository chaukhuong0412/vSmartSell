import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupProductTypeCreateComponent } from './group-product-type-create.component';

describe('GroupProductTypeCreateComponent', () => {
  let component: GroupProductTypeCreateComponent;
  let fixture: ComponentFixture<GroupProductTypeCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupProductTypeCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupProductTypeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
