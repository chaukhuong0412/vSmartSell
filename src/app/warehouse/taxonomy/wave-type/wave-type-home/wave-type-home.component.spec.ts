import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaveTypeHomeComponent } from './wave-type-home.component';

describe('WaveTypeHomeComponent', () => {
  let component: WaveTypeHomeComponent;
  let fixture: ComponentFixture<WaveTypeHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaveTypeHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaveTypeHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
