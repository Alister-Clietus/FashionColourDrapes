import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {

  constructor(private http: HttpClient) {

  }

  downloadPdf(url: string,data: any): Observable<Blob> {
    return this.http.post(url, data, { responseType: 'blob' });
  }

  public postdata<T>(url: string, data: any): Observable<T> {
    return this.http.post<T>(url, data);
  } // Function to post data to the springboot backend

  public deleteData<T>(url: string, data: any): Observable<T> {
    return this.http.post<T>(url, data);
  } // Function to delete data to the springboot backend

  public update<T>(url: string, data: any): Observable<T> {
    return this.http.put<T>(url, data);
  } // Function to update data to the springboot backend

  public getbyid<T>(url: string, data: any): Observable<T> {
    return this.http.post<T>(url, data);
  } // Function to get data to the springboot backend

  public getData<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }
  

}
