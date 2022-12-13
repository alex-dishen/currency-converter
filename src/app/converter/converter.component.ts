import { Component } from '@angular/core';
import { ExchangeRateApiService } from '../services/exchange-rates-api-service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent {

  leftCurrency: string = 'USD';
  rightCurrency: string = 'UAH';
  result: string = '';
  leftToRight: boolean = true;

  ngOnInit() {
    this.http.getCurrencyData('USD', 'UAH', 1);
  }

  changeLeftCurrency(cur: string) {
    this.leftCurrency = cur;
  }

  changeRightCurrency(cur: string) {
    this.rightCurrency = cur;
  }

  constructor(private http: ExchangeRateApiService) {}

  convert(digit: string) {
    let numberToConvert = +digit;
    if(numberToConvert === 0) {
      this.result = ''
      return
    };

    const convertFrom = this.leftToRight ? this.leftCurrency : this.rightCurrency;
    const convertTo = this.leftToRight ? this.rightCurrency : this.leftCurrency;

    this.http.getCurrencyData(convertFrom, convertTo, numberToConvert)
      .subscribe( (data) => {
        this.result = data.conversion_result.toFixed(2).toString();
      })
  }
}