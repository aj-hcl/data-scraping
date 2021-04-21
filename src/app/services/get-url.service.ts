import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetUrlService {

  constructor(private http: HttpClient) {

  }

  private sendUrlAPI = environment.sendUrlAPI;
  private sendCheckedAPI = environment.sendCheckedAPI;

  getUrl(url: string): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    const body = { 'url': url };
    return this.http.post<any>(this.sendUrlAPI, body, { headers });
  }

  sendChecked(checkboxesChecked: Array<string>): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    const body = { 'checkboxesChecked': checkboxesChecked };
    return this.http.post<any>(this.sendCheckedAPI, body, { headers });
  }

  getSaved(url: string): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    const body = { 'url': url };
    return this.http.put<any>(this.sendCheckedAPI, body, { headers });
  }
}
