import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCreateDialogComponent } from './store-create-dialog.component';

describe('CuahangCreateDialogComponent', () => {
  let component: StoreCreateDialogComponent;
  let fixture: ComponentFixture<StoreCreateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreCreateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
