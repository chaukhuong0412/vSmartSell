import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CongtyCreateDialogComponent } from './congty-create-dialog.component';

describe('CongtyCreateDialogComponent', () => {
  let component: CongtyCreateDialogComponent;
  let fixture: ComponentFixture<CongtyCreateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CongtyCreateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CongtyCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
