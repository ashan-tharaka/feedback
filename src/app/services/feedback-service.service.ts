import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FeedbackSummary } from '../model/feedback-summary';

const baseUrl = 'https://localhost:7132/api/';

@Injectable({
  providedIn: 'root'
})
export class FeedbackServiceService {


  constructor(private http: HttpClient) { }

  getSummary(): Observable<FeedbackSummary> {
    return this.http.get<FeedbackSummary>(baseUrl+"FeedbackSummary");
  }

  getAll(): Observable<any> {
    return this.http.get(baseUrl+"Feedback");
  }

  get(id:number): Observable<any> {
    return this.http.get(`${baseUrl}"Feedback/${id}`);
  }

  create(data:any): Observable<any> {
    return this.http.post(baseUrl+"Feedback", data);
  }

  update(id:number, data:any): Observable<any> {
    return this.http.put(`${baseUrl}Feedback/${id}`, data);
  }

  delete(id:number): Observable<any> {
    return this.http.delete(`${baseUrl}Feedback/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl+"Feedback");
  }


}


