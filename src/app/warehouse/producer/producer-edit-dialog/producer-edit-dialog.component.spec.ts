import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducerEditDialogComponent } from './producer-edit-dialog.component';

describe('ProducerEditDialogComponent', () => {
  let component: ProducerEditDialogComponent;
  let fixture: ComponentFixture<ProducerEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProducerEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProducerEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
