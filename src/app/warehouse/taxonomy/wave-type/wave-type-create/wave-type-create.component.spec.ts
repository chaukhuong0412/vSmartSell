import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaveTypeCreateComponent } from './wave-type-create.component';

describe('WaveTypeCreateComponent', () => {
  let component: WaveTypeCreateComponent;
  let fixture: ComponentFixture<WaveTypeCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaveTypeCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaveTypeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
