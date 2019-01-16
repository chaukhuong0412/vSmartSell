import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducerCreateDialogComponent } from './producer-create-dialog.component';

describe('ProducerCreateComponent', () => {
  let component: ProducerCreateDialogComponent;
  let fixture: ComponentFixture<ProducerCreateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProducerCreateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProducerCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
