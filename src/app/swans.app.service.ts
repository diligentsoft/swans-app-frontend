import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { FlytippingReport } from './flytipping';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class SwansAppService {

  private flytippingUrl = 'https://zia6r5shye.execute-api.eu-west-2.amazonaws.com/dev/flytipping';  // URL to web api

  constructor(
    private http: HttpClient) { }


  //////// Save methods //////////

  /** POST: add a new flytipping report to the server */
  sendFlytippngReport (report: FlytippingReport): Observable<FlytippingReport> {
    return this.http.post<FlytippingReport>(this.flytippingUrl, report, httpOptions).pipe(
      tap((report: FlytippingReport) => console.log(`sent flytipping report`)),
      catchError(this.handleError<FlytippingReport>('sendFlytippngReport'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return Observable.of(result);
    };
  }

}
