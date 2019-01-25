import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseCreateDialogComponent } from './warehouse-create-dialog.component';

describe('WarehouseCreateDialogComponent', () => {
  let component: WarehouseCreateDialogComponent;
  let fixture: ComponentFixture<WarehouseCreateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehouseCreateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
