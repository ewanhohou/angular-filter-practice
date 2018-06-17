import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

const URL = 'https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97';
@Injectable({
  providedIn: 'root'
})
export class KtravelService {

  constructor(private http: HttpClient) { }

  getTravelData(): Observable<any> {
    return this.http.get<any>(URL)
      .pipe(
        catchError(this.handleError('getTravelData', []))
      );
  }

  queryTravelData(term: string): Observable<any> {
    // let termtrim = term.trim()
    return this.http.get<any>(URL + '&q=' + term)
      .pipe(
        catchError(this.handleError('getTravelData', []))
      );
  }

  /**
  * Handle Http operation that failed.
  * Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
