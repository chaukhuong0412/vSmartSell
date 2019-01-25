import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseEditDialogComponent } from './warehouse-edit-dialog.component';

describe('WarehouseEditDialogComponent', () => {
  let component: WarehouseEditDialogComponent;
  let fixture: ComponentFixture<WarehouseEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehouseEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
