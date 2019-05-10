import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VenueComponent} from './venue_list/venue-table/venue.component';
import { VenuesMapViewComponent } from './venue_list/venues-map-view/venues-map-view.component';
import { EventsViewComponent } from './events-list/events-view/events-view.component';

const routes: Routes = [ {path: 'venue', component: VenueComponent}, {path: 'map-view', component: VenuesMapViewComponent},{path: 'events', component: EventsViewComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
