import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionCreateDialogComponent } from './region-create-dialog.component';

describe('RegionCreateDialogComponent', () => {
  let component: RegionCreateDialogComponent;
  let fixture: ComponentFixture<RegionCreateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionCreateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
