import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IEventData } from '../events-list/events-view/events-data';
@Injectable({
  providedIn: 'root'
})
export class EventsService {
 //url path for file establishment-data.json
 private _urlEventsJson : string ="/assets/data/events-data.json"
  constructor(private http:HttpClient) { }
  getEvents() : Observable<IEventData[]>{
    return this.http.get<IEventData[]>(this._urlEventsJson).pipe(catchError(this.errorHandler));
  }
  errorHandler(error: HttpErrorResponse){
    return Observable.throw(error.message || "Server Error")
  }
}
