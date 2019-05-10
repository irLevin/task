import { Component, OnInit } from '@angular/core';
import { Data } from "../../services/data";
import { LocationVenue } from "../venues-map-view/location_venue"
import { VenuesService } from 'src/app/services/venues.service';

@Component({
  selector: 'app-venues-map-view',
  templateUrl: './venues-map-view.component.html',
  styleUrls: ['./venues-map-view.component.css']
})

export class VenuesMapViewComponent implements OnInit {
  /**map parameters */
  lat: number;
  lng: number;
  zoom: number = 10;
  iconPath: string = './assets/icons/default-icon.png';
  iconSizeY: number = 30;
  iconSizeX: number = 20;
  /**venues data */
  venueSelected: boolean = false;
  venues_location_data: LocationVenue[] = [];
  venues_data = null;
  errorMsg;

  constructor(private _venueService: VenuesService, private data: Data) {
    if (this.data.storage) {
      this.venues_data = this.data.storage;
      this.createLocationArr(this.venues_data);
    }
    else {
      this._venueService.getVenues()
        .subscribe(data => {
          this.venues_data = data;
          this.createLocationArr(this.venues_data);
        },
          error => this.errorMsg = error)
    }

  }
  ngOnInit() {

  }
  /**generate array of location objects */
  private createLocationArr(data) {
    this.venues_location_data = data.map(item => {
      return {
        "id": item.trcid,
        "lat": item.location.latitude.replace(',', '.'),
        "lng": item.location.longitude.replace(',', '.'),
        "img": this.iconPath,
        "name": item.title
      };
    });
    if (this.venues_location_data) {
      this.lat = this.venues_location_data[0].lat;
      this.lng = this.venues_location_data[0].lng;
    }
  }
  /**get data from child component (venue-table)*/
  getUpdatedvalue($event) {
    if ($event && $event.data) {
      this.createLocationArr($event.data);
      this.zoom = 10;
      this.iconSizeX = 20;
      this.iconSizeY = 30;
      this.venueSelected = false;
    }
  }
  /**get data from child component (venue-table) selected venue*/
  highlightMark($event) {
    this.venues_location_data = [];
    this.venues_location_data.push({
      "id": $event[0].trcid,
      "lat": $event[0].location.latitude.replace(',', '.'),
      "lng": $event[0].location.longitude.replace(',', '.'),
      "img": ($event[0].media !== "undefined" && $event[0].media.length > 0) ? $event[0].media[0].url : this.iconPath,
      "name": $event[0].title
    });
    this.lat = this.venues_location_data[0].lat;
    this.lng = this.venues_location_data[0].lng;
    this.zoom = 13;
    this.iconSizeX = 60;
    this.iconSizeY = 50;
    this.venueSelected = true;
  }

}
