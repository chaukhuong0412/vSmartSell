import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionHomeComponent } from './permission-home.component';

describe('PermissionHomeComponent', () => {
  let component: PermissionHomeComponent;
  let fixture: ComponentFixture<PermissionHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermissionHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
