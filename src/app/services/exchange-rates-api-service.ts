import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { ExRate } from "./ExRate";

@Injectable({
    providedIn: 'root'
  })
  export class ExchangeRateApiService {
    url: string = 'https://v6.exchangerate-api.com/v6/96f7e4f7849357c8da466dbf/pair';
  
    constructor(private http: HttpClient) { }
  
    getCurrencyData(from: string, to: string, amount: number): Observable<ExRate> {
      return this.http.get<ExRate>(`${this.url}/${from}/${to}/${amount}`);
    }
  }