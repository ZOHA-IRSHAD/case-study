import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { map , catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  options: RequestOptions;
  headers: Headers;

  constructor(private _http : Http) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.options = new RequestOptions({ headers: this.headers });
   }


    //Get jobs
    getData(url: string): Observable<any> {
      return this._http
        .get(url, this.options)
        .pipe(map(this.extractData),
             catchError(this.handleError)
            );
  
    }
    private extractData(response: Response) {
      let body = response.json();
      return body || {};
    }
  
    private handleError(error: Response) {
      return Observable.throw(error);
    }
}
