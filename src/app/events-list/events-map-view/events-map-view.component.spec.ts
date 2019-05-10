import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsMapViewComponent } from './events-map-view.component';

describe('EventsMapViewComponent', () => {
  let component: EventsMapViewComponent;
  let fixture: ComponentFixture<EventsMapViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsMapViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsMapViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
