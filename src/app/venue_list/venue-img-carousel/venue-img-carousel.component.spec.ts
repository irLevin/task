import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueImgCarouselComponent } from './venue-img-carousel.component';

describe('VenueImgCarouselComponent', () => {
  let component: VenueImgCarouselComponent;
  let fixture: ComponentFixture<VenueImgCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenueImgCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueImgCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
