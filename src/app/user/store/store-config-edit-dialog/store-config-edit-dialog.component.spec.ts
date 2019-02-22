import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreConfigEditDialogComponent } from './store-config-edit-dialog.component';

describe('StoreConfigEditDialogComponent', () => {
  let component: StoreConfigEditDialogComponent;
  let fixture: ComponentFixture<StoreConfigEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreConfigEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreConfigEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
