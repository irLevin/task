import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { VenueComponent } from './venue_list/venue-table/venue.component';
import { VenuesService } from './services/venues.service';
import {HttpClientModule} from '@angular/common/http';
import { MatTableModule, MatPaginatorModule, MatSortModule} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import { MaterialModule } from './material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { VenueDetailsModalComponent } from './venue_list/venue-details-modal/venue-details-modal.component';
import { VenueImgCarouselComponent } from './venue_list/venue-img-carousel/venue-img-carousel.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { VenuesMapViewComponent } from './venue_list/venues-map-view/venues-map-view.component';
import { AgmCoreModule } from '@agm/core';
import { Data } from "./services/data";
import { EventsViewComponent } from './events-list/events-view/events-view.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EventsMapViewComponent } from './events-list/events-map-view/events-map-view.component';

const routes: Routes = [ {path: '', component: VenueComponent}, {path: 'map-view', component: VenuesMapViewComponent}, 
{path: 'events', component: EventsMapViewComponent}];
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    VenueComponent,
    VenueDetailsModalComponent,
    VenueImgCarouselComponent,
    VenuesMapViewComponent,
    EventsViewComponent,
    EventsMapViewComponent
  ],

  entryComponents: [
    VenueDetailsModalComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    BrowserAnimationsModule,
    MatIconModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    CarouselModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAAEVHsj61FL_oLN8X0wRW6rhC4IX9UmaA',
      libraries: ['geometry']
    })
    
  ],
  providers: [VenuesService, Data],
  bootstrap: [AppComponent]
})
export class AppModule { }
