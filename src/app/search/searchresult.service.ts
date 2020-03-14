import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchresultService {
  private wildurl = 'http://localhost:8081/ar_demo/users/wild/';
  private advurl =  'http://localhost:8081/ar_demo/users/advance-search?';
  private invoiceurl = 'http://localhost:8081/ar_demo/invoice-details?';
  private arsummaryUrl = 'http://localhost:8081/ar_demo/ar-summary/list/data?';


  constructor(private http: HttpClient) {
  }

  getPatientWildSearch(param): Observable<any> {
    return this.http.get<any>(this.wildurl + param,
        {headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }}).pipe(map(this.extractObject));
  }

  getPatientAdvSearch(fname, lname, id): Observable<any> {
    return this.http.get<any>(this.advurl + `fname=${fname}&lname=${lname}&id=${id}`,
        {headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }}).pipe(map(this.extractObject));
  }

  getInvoiceDetails(id): Observable<any> {
    return this.http.get<any>(this.invoiceurl + `userID=` + id + '&pageSize=10',
        {headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }}).pipe(map(this.extractObject));
  }

  getdifferenceInvoiceDetails(pfromdate, ptodate, userId): Observable<any> {
    return this.http.get<any>(this.invoiceurl + `startDate=${pfromdate}&endDate=${ptodate}&userID=${userId}&pageSize=10`,
        {headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }}).pipe(map(this.extractObject));
  }

  getarDetails(id): Observable<any> {
    return this.http.get<any>(this.arsummaryUrl + `userID=` + id,
        {headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }}).pipe(map(this.extractObject));
  }


  getarDetailsByInvoice(id, invoiceID): Observable<any> {
    return this.http.get<any>(this.arsummaryUrl + `userID=${id}&invoiceID=${invoiceID}`,
        {headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }}).pipe(map(this.extractObject));
  }


  getarDetailsBySearch(pfromdate, ptodate, id, invoiceID): Observable<any> {
    return this.http.get<any>(this.arsummaryUrl + `startDate=${pfromdate}&endDate=${ptodate}&userID=${id}&invoiceID=${invoiceID}`,
        {headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }}).pipe(map(this.extractObject));
  }

  private extractObject(res: any) {
    const body = res;
    return body || [];
  }
}
