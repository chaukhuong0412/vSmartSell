import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuahangEditDialogComponent } from './cuahang-edit-dialog.component';

describe('CuahangEditDialogComponent', () => {
  let component: CuahangEditDialogComponent;
  let fixture: ComponentFixture<CuahangEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuahangEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuahangEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
