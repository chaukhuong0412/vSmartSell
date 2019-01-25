import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxonomyHomeComponent } from './taxonomy-home.component';

describe('TaxonomyHomeComponent', () => {
  let component: TaxonomyHomeComponent;
  let fixture: ComponentFixture<TaxonomyHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxonomyHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxonomyHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
