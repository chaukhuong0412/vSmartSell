import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducerCreateComponent } from './producer-create.component';

describe('ProducerCreateComponent', () => {
  let component: ProducerCreateComponent;
  let fixture: ComponentFixture<ProducerCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProducerCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProducerCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
