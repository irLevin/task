import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { Data } from "../../services/data";
import { MapsAPILoader } from '@agm/core';
import { EventsService } from 'src/app/services/events.service';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { EventObj } from './event';
import { FormControl } from '@angular/forms';
import { IEventData } from './events-data';
declare var google;

@Component({
  selector: 'events-view',
  templateUrl: './events-view.component.html',
  styleUrls: ['./events-view.component.css']
})
export class EventsViewComponent implements OnInit {
  /**declare data structure for venue and events */
  current_venue = null;
  events_list = null;
  eventsVenue: EventObj[] = [];
  yearArray = [];
  monthArray = [];
  /**filters */
  filteredEvents: EventObj[] = [];
  /**table properties */
  listEventsToDisplay: MatTableDataSource<any>;
  displayedColumns: string[] = ['title', 'startdate', 'distance'];
  errorMsg;
  /**for control hiding classin view */
  isHidden: boolean = true;

  /** filter boxes */
  yearFilter = new FormControl();
  monthFilter = new FormControl();
  nameFilter = new FormControl();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private data: Data, private _eventsService: EventsService, private mapsAPILoader: MapsAPILoader) {
    this.current_venue = this.data.storage ? this.data.storage : JSON.parse(localStorage.getItem('venue'));
    localStorage.setItem('venue', JSON.stringify(this.current_venue));
    this._eventsService.getEvents()
      .subscribe(data => {
        this.events_list = data;
        this.createEventsArr(this.events_list, this.current_venue);
      },
        error => this.errorMsg = error)
  }

  ngOnInit() {
    this.yearFilter.valueChanges.subscribe((positionFilterValueYear) => {
      this.listEventsToDisplay.data = this.filterOptions(positionFilterValueYear, this.nameFilter.value, this.monthFilter.value);

    });
    this.monthFilter.valueChanges.subscribe((positionFilterValueMonth) => {
      this.listEventsToDisplay.data = this.filterOptions(this.yearFilter.value, this.nameFilter.value, positionFilterValueMonth);

    });
    this.nameFilter.valueChanges.subscribe((nameFilterValue) => {
      this.listEventsToDisplay.data = this.filterOptions(this.yearFilter.value, nameFilterValue, this.monthFilter.value);

    });
  }
  /** filter function */
  filterOptions(positionValueYear: string[], nameValue: string, positionValueMonth: string[]): EventObj[] {
    var filtered = null;
    if ((!positionValueYear || positionValueYear.length === 0) && (!positionValueMonth || positionValueMonth.length === 0) && !nameValue) {
      return this.filteredEvents;
    }
    if ((positionValueYear && positionValueYear.length !== 0) && nameValue && (positionValueMonth && positionValueMonth.length !== 0)) {
      filtered = this.filteredEvents.filter((item) => {
        return (nameValue ? item.title.toLowerCase().includes(nameValue.toLowerCase()) : false) && (positionValueYear ? positionValueYear.toString().indexOf(this.dateHelper(item.startdate, 'year').toString()) !== -1 : false)
          && (positionValueMonth ? positionValueMonth.toString().indexOf(this.dateHelper(item.startdate, 'month').toString()) !== -1 : false)
      });
    }
    if ((positionValueYear && positionValueYear.length !== 0) && nameValue && (!positionValueMonth || positionValueMonth.length === 0)) {
      filtered = this.filteredEvents.filter((item) => {
        return (nameValue ? item.title.toLowerCase().includes(nameValue.toLowerCase()) : false) && (positionValueYear ? positionValueYear.toString().indexOf(this.dateHelper(item.startdate, 'year').toString()) !== -1 : false)
      });
    }
    if ((positionValueYear && positionValueYear.length !== 0) && !nameValue && (positionValueMonth && positionValueMonth.length !== 0)) {
      filtered = this.filteredEvents.filter((item) => {
        return (positionValueMonth ? positionValueMonth.toString().indexOf(this.dateHelper(item.startdate, 'month').toString()) !== -1 : false)
          && (positionValueYear ? positionValueYear.toString().indexOf(this.dateHelper(item.startdate, 'year').toString()) !== -1 : false)
      });
    }
    if ((positionValueYear && positionValueYear.length !== 0) && !nameValue && (!positionValueMonth || positionValueMonth.length === 0)) {
      filtered = this.filteredEvents.filter((item) => {
        return (positionValueYear ? positionValueYear.toString().indexOf(this.dateHelper(item.startdate, 'year').toString()) !== -1 : false)
      });
    }
    if ((!positionValueYear || positionValueYear.length === 0) && nameValue && (!positionValueMonth || positionValueMonth.length === 0)) {
      filtered = this.filteredEvents.filter((item) => {
        return (nameValue ? item.title.toLowerCase().includes(nameValue.toLowerCase()) : false)
      });
    }
    if ((!positionValueYear || positionValueYear.length === 0) && !nameValue && (positionValueMonth && positionValueMonth.length !== 0)) {
      filtered = this.filteredEvents.filter((item) => {
        return (positionValueMonth ? positionValueMonth.toString().indexOf(this.dateHelper(item.startdate, 'month').toString()) !== -1 : false)
      });
    }
    if ((!positionValueYear || positionValueYear.length === 0) && nameValue && (positionValueMonth && positionValueMonth.length !== 0)) {
      filtered = this.filteredEvents.filter((item) => {
        return (nameValue ? item.title.toLowerCase().includes(nameValue.toLowerCase()) : false)
          && (positionValueMonth ? positionValueMonth.toString().indexOf(this.dateHelper(item.startdate, 'month').toString()) !== -1 : false)
      });
    }
    return filtered;
  }
  /**helper func for retrieving date */
  dateHelper(startDate, param) {
    var dateParam;
    if (startDate instanceof Array) {
      var num: number = 0
      for (num = 0; num < startDate.length; num++) {
        dateParam = startDate[num].split('-');
        return this.getDateParameter(dateParam, param);
      }
    }
    else {
      dateParam = startDate.split('-');
      return this.getDateParameter(dateParam, param);
    }
  }
  /**helper fubction for date */
  getDateParameter(date, param) {
    if (date && param) {
      var formatDate = new Date(date[2], date[1] - 1, date[0]);
      if (param == 'year') {
        return formatDate.getFullYear();
      }
      else {
        return formatDate.toLocaleString('en-us', { month: 'long' });
      }
    }
    return '';
  }
  /**push set of years into array for filter box */
  addMonthYeartoArray(data, yearArray, monthArray) {
    if (data != null) {
      data.forEach(function (value) {
        var dateParam;
        if (value.startdate instanceof Array) {
          value.startdate.forEach(function (v) {
            var parts = v.split('-');
            var formatDate = new Date(parts[2], parts[1] - 1, parts[0])
            if (!yearArray.includes(formatDate.getFullYear()) && !yearArray.includes(formatDate.getFullYear().toString())) {
              yearArray.push(formatDate.getFullYear().toString())
            }
            if (!monthArray.includes(formatDate.toLocaleString('en-us', { month: 'long' }))) {
              monthArray.push(formatDate.toLocaleString('en-us', { month: 'long' }).toString())
            }
          });
        }
        else {
          var parts = value.startdate.split('-');
          var formatDate = new Date(parts[2], parts[1] - 1, parts[0]);
          if (!yearArray.includes(formatDate.getFullYear()) && !yearArray.includes(formatDate.getFullYear().toString())) {
            yearArray.push(formatDate.getFullYear())
          }
          if (!monthArray.includes(formatDate.toLocaleString('en-us', { month: 'long' }))) {
            monthArray.push(formatDate.toLocaleString('en-us', { month: 'long' }))
          }
        }
      });
      this.yearArray = yearArray;
      this.monthArray = monthArray;
    }
  }
  /**geberating events array */
  createEventsArr(data, venue_position) {
    this.eventsVenue = data.map(item => {
      return {
        "id": item.trcid,
        "lat": item.location.latitude.replace(',', '.'),
        "lng": item.location.longitude.replace(',', '.'),
        "description": item.details.en.shortdescription,
        "title": item.title,
        "startdate": (item.dates && item.dates.singles) ? item.dates.singles : ((item.dates && item.dates.startdate) ? item.dates.startdate : null),
        "enddate": (item.dates && item.dates.singles) ? null : ((item.dates && item.dates.enddate) ? item.dates.enddate : null),
        "distance": null
      }
    });
    this.filterEventsByDistance(this.eventsVenue, venue_position);
  }
  /**calculation distance */
  filterEventsByDistance(events, venue_position) {
    this.mapsAPILoader.load().then(() => {
      const venue = new google.maps.LatLng(parseFloat(venue_position.location[0].latitude.replace(",", ".")), parseFloat(venue_position.location[0].longitude.replace(",", ".")));
      var filteredMarkers = events.filter(m => {
        const eventLoc = new google.maps.LatLng(parseFloat(m.lat), parseFloat(m.lng));
        const distance = google.maps.geometry.spherical.computeDistanceBetween(eventLoc, venue);
        if (distance < 1000) {
          m.distance = Math.round(distance);
          this.filteredEvents.push(m);
          return m;
        }
      });
      if (this.filteredEvents.length > 0) {
        this.listEventsToDisplay = new MatTableDataSource(this.filteredEvents);
        this.listEventsToDisplay.paginator = this.paginator;
        this.listEventsToDisplay.sort = this.sort;
        this.addMonthYeartoArray(this.filteredEvents, this.yearArray, this.monthArray);
        this.isHidden = false;
      }
      else {
        this.errorMsg = "There are no suitable events around"
      }
    });

  }
  /**general func for check type obj */
  isString(val) { return typeof val === 'string'; }

}
