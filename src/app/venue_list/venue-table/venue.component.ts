import { Component, OnInit, Input, ViewChild, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Router} from "@angular/router";
import { VenuesService } from '../../services/venues.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { FormControl } from '@angular/forms';
import { IVenueData } from './venue_data';
import { VenueDetailsModalComponent } from '../venue-details-modal/venue-details-modal.component';
import { Data } from "../../services/data";

@Component({
  selector: 'venues-list',
  templateUrl: './venue.component.html',
  styleUrls: ['./venue.component.css']
})


export class VenueComponent implements OnInit {
/**declare an array of venues   */
  venues_list = null; 
  errorMsg; //error message in case of error in retrieving json data 
  /**table properties */
  displayedColumns: string[] = ['title', 'location.city', 'location.zipcode', 'location.adress', 'dates.startdate', 'details']; //define table's columns
  listVenuesData: MatTableDataSource<any>;
  private VenueDetailsModal = VenueDetailsModalComponent;
  /**declare cities array */
  public citiesArray = [];
  /** filter boxes */
  cityFilter = new FormControl();
  nameFilter = new FormControl();
  public filteredValues = { position: '', name: '', weight: '', symbol: '' };

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Output() valueUpdate = new EventEmitter();
  @Output() mapMarkerHighlight = new EventEmitter();
  @Input() isTableView: boolean = true;
  constructor(private _venueService: VenuesService, public modalWindow: MatDialog, private data: Data, private router: Router) {
    this._venueService.getVenues()
      .subscribe(data => {
        this.venues_list = data;
        this.listVenuesData = new MatTableDataSource(this.venues_list);
        this.listVenuesData.paginator = this.paginator;
        this.listVenuesData.sortingDataAccessor = this.sortingDataAccessor;
        this.listVenuesData.sort = this.sort;
        this.citiesArray = this.addCitiestoArray(this.venues_list, this.citiesArray)
      },
        error => this.errorMsg = error)
  }
  /**define sorting accessor in case of
   * complex nested json file */
  sortingDataAccessor(item, property) {
    if (property.includes('.')) {
      return property.split('.')
        .reduce((object, key) => object[key], item);
    }
    return item[property];
  }

  ngOnInit() {
    this.cityFilter.valueChanges.subscribe((positionFilterValue) => {
      this.listVenuesData.data = this.filterOptions(positionFilterValue, this.nameFilter.value);
      this.valueUpdate.emit(this.listVenuesData);
    });

    this.nameFilter.valueChanges.subscribe((nameFilterValue) => {
      this.listVenuesData.data = this.filterOptions(this.cityFilter.value, nameFilterValue);
      this.valueUpdate.emit(this.listVenuesData);
    });
  }
  /**get isTableView for dynamic changing of item's class */
  get IsTableViewValue() {
    return this.isTableView;
  }
  /**push set of sities into array for filter box */
  addCitiestoArray(data, cities) {
    if (data != null) {
      data.forEach(function (value) {
        if (!cities.includes(value.location.city)) {
          cities.push(value.location.city)
        }
      });
      return cities;
    }
  }
  /** filter function */
  filterOptions(positionValue: string[], nameValue: string): IVenueData[] {
    var filtered = null;
    if ((!positionValue || positionValue.length === 0) && !nameValue) {
      return this.venues_list;
    }

    if ((positionValue && positionValue.length !== 0) && nameValue) {
      filtered = this.venues_list.filter((item) => {
        return (nameValue ? (item.title.toLowerCase().includes(nameValue.toLowerCase()) || item.location.zipcode.includes(nameValue.toLowerCase())
          || (item.dates.startdate != null && item.dates.startdate.includes(nameValue.toLowerCase()))) : false) && (positionValue ? positionValue.indexOf(item.location.city + '') !== -1 : false)
      });
    }
    else {
      filtered = this.venues_list.filter((item) => {
        return (nameValue ? (item.title.toLowerCase().includes(nameValue.toLowerCase()) || item.location.zipcode.includes(nameValue.toLowerCase())
          || (item.dates.startdate != null && item.dates.startdate.includes(nameValue.toLowerCase()))) : false) || (positionValue ? positionValue.indexOf(item.location.city + '') !== -1 : false)
      });
    }
    return filtered;
  }
  /**open venue details modal */
  public openDetailsModal(id_venue) {
    if (id_venue) {
      var filteredItem = this.venues_list.filter(item => item.trcid == id_venue);
      this.mapMarkerHighlight.emit(filteredItem);
      const dialogRef=this.modalWindow.open(this.VenueDetailsModal, {
        data: {
          venue_id: id_venue, location_venue: filteredItem.map(item => item.location), title:filteredItem.map(item => item.title),
          url: filteredItem.map(item => item.urls), picture: filteredItem.map(item => item.media.map(m => m.url))

        },
      });
      dialogRef.beforeClosed().subscribe(result => {
        this.valueUpdate.emit(this.listVenuesData);
      });
     
    }
  }
  /**redirect to map view */
  public routeToMap() {
    this.data.storage = this.venues_list;
    this.router.navigate(["map-view"]);
  }
}
