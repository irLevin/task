import { Component, OnInit, Inject, AfterViewInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Router} from "@angular/router";
import { Data } from "../../services/data";
@Component({
  selector: 'app-venue-details-modal',
  templateUrl: './venue-details-modal.component.html',
  styleUrls: ['./venue-details-modal.component.css']
})
export class VenueDetailsModalComponent implements OnInit, AfterViewInit {
  private venue_id;
  private address;
  private urls: [];
  private pictures: [];
  private name;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<VenueDetailsModalComponent>,private router: Router,private dataStor: Data) { }

  ngOnInit() {

  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.getDetails();
    }, 200);
  }
/**get venue data from parent component */
  public getDetails() {
    if (this.data) {
      this.venue_id = this.data.venue_id;
      this.address = this.data.location_venue !== "undefined" ? this.data.location_venue[0].adress +", "+this.data.location_venue[0].city +", "+this.data.location_venue[0].zipcode : null;
      this.name=this.data.title !== "undefined" ? this.data.title : null;
      this.urls = this.data.url!== "undefined" ? this.data.url[0] : null;
      this.pictures = this.data.picture !== "undefined" ? this.data.picture[0] : null;
      
    }
  }
  /**close modal */
  public closeModalWin(){
    this.dialogRef.close();
  }
  /**events btn clicked */
  public eventsOpen(data){
    this.dialogRef.close();
    this.dataStor.storage = {id:data.venue_id, location:data.location_venue};    
    this.router.navigate(["events"]);
  }
}
