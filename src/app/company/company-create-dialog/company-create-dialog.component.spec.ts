import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyCreateDialogComponent } from './company-create-dialog.component';

describe('CongtyCreateDialogComponent', () => {
  let component: CompanyCreateDialogComponent;
  let fixture: ComponentFixture<CompanyCreateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyCreateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
