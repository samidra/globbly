import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactServiceService {

  constructor(private http: HttpClient) { }

  submit_query(body:any){
   return this.http.post('http://127.0.0.1:8000/api/submit_query', body)
  }

}
