import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuahangCreateDialogComponent } from './cuahang-create-dialog.component';

describe('CuahangCreateDialogComponent', () => {
  let component: CuahangCreateDialogComponent;
  let fixture: ComponentFixture<CuahangCreateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuahangCreateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuahangCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
