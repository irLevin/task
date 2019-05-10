import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IVenueData } from '../venue_list/venue-table/venue_data';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class VenuesService {
  //url path for file establishment-data.json
  private _urlVenuesJson : string ="/assets/data/establishment-data.json"
  constructor(private http:HttpClient) { }

  getVenues() : Observable<IVenueData[]>{
    return this.http.get<IVenueData[]>(this._urlVenuesJson).pipe(catchError(this.errorHandler));
  }
  errorHandler(error: HttpErrorResponse){
    return Observable.throw(error.message || "Server Error")
  }
}
