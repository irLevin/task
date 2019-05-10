import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenuesMapViewComponent } from './venues-map-view.component';

describe('VenuesMapViewComponent', () => {
  let component: VenuesMapViewComponent;
  let fixture: ComponentFixture<VenuesMapViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenuesMapViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenuesMapViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
