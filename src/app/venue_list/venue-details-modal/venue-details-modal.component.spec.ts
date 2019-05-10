import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueDetailsModalComponent } from './venue-details-modal.component';

describe('VenueDetailsModalComponent', () => {
  let component: VenueDetailsModalComponent;
  let fixture: ComponentFixture<VenueDetailsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenueDetailsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
