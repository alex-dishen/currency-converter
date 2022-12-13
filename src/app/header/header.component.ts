import { Component } from '@angular/core';
import { ExchangeRateApiService } from '../services/exchange-rates-api-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  dollar: number = 0;
  euro: number = 0;

  constructor(private http: ExchangeRateApiService) {}

  ngOnInit() {
    this.getCurrencyValue('USD');
    this.getCurrencyValue('EUR')
  }

  getCurrencyValue(curr: string) {
    let result;
    
    this.http.getCurrencyData(curr, 'UAH', 1)
      .subscribe(data => {
        result = +data.conversion_result.toFixed(2);
        curr === 'USD' 
          ? this.dollar = result
          : this.euro = result
      }
    );
  }
}