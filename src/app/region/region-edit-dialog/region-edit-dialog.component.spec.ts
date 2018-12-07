import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionEditDialogComponent } from './region-edit-dialog.component';

describe('RegionEditDialogComponent', () => {
  let component: RegionEditDialogComponent;
  let fixture: ComponentFixture<RegionEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
