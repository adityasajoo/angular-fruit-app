import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import {  EMPTY, Observable,BehaviorSubject} from "rxjs";
import {catchError, retry, shareReplay} from "rxjs/operators";

const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class ModelService {
  private apiUrl = 'http://localhost:5000';
  public result = new BehaviorSubject({});
  public loading = new BehaviorSubject(null);
  constructor(private http:HttpClient) { }



  checkConnection():Observable<any>{
    return this.http.get(this.apiUrl,httpOptions).pipe(
      retry(3),
      catchError(()=>{
        return EMPTY;
      }),
      shareReplay()
    );
  }

  predict(body):Observable<any>{
    const formdata = new FormData()
    formdata.append('file',body.file,body.file.name)
    formdata.append('model',body.model);
    const url = `${this.apiUrl}/predict`;
    return this.http.post(url,formdata);
  }

}
