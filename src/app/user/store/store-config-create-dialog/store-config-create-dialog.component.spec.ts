import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreConfigCreateDialogComponent } from './store-config-create-dialog.component';

describe('StoreConfigCreateDialogComponent', () => {
  let component: StoreConfigCreateDialogComponent;
  let fixture: ComponentFixture<StoreConfigCreateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreConfigCreateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreConfigCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
