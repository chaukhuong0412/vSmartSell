import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CongtyEditDialogComponent } from './congty-edit-dialog.component';

describe('CongtyEditDialogComponent', () => {
  let component: CongtyEditDialogComponent;
  let fixture: ComponentFixture<CongtyEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CongtyEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CongtyEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
