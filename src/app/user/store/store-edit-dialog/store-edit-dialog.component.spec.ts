import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreEditDialogComponent } from './store-edit-dialog.component';

describe('CuahangEditDialogComponent', () => {
  let component: StoreEditDialogComponent;
  let fixture: ComponentFixture<StoreEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
