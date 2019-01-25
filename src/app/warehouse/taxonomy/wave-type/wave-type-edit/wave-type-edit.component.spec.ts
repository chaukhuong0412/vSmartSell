import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaveTypeEditComponent } from './wave-type-edit.component';

describe('WaveTypeEditComponent', () => {
  let component: WaveTypeEditComponent;
  let fixture: ComponentFixture<WaveTypeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaveTypeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaveTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
