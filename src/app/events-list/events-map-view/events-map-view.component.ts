import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'events-map-view',
  templateUrl: './events-map-view.component.html',
  styleUrls: ['./events-map-view.component.css']
})
export class EventsMapViewComponent implements OnInit {
  /**map properties */
  lat: number;
  lng: number;
  id:string;
  zoom: number = 15;
  iconPath: string = './assets/icons/default-icon.png';
  iconEvent: string='./assets/icons/event.png';
  iconSizeY: number = 50;
  iconSizeX: number = 40;
  public markersArr: [];
  @Input() eventsToShow: any;
  @Input() currentvenue;
  constructor() {

  }

  ngOnInit() {
    if (this.eventsToShow && this.currentvenue) {

    }
  }
  ngOnChanges() {
    if (this.eventsToShow && this.currentvenue) {
      this.markersArr=this.eventsToShow;
      this.lat=this.currentvenue.location[0].latitude.replace(',','.');
      this.lng=this.currentvenue.location[0].longitude.replace(',','.');
      this.id=this.currentvenue.id;
    }
  }
}
