import { Component } from '@angular/core';
import { CurrencyAPIDataService } from './service/currency-api-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Currency Swap';

  currJSON: any = [];
  leftCurrency = 'USD';
  rightCurrency = 'UAH';
  result: string = '';
  numberToConvert: number = 0;
  currentDollar: number = 0;
  currentEuro: number = 0;
  leftToRight: boolean = true;


  changeLeftCurrency(a: string) {
    this.leftCurrency = a;
  }

  changeRightCurrency(b: string) {
    this.rightCurrency = b;
  }

  constructor(private currency: CurrencyAPIDataService) {}

  getCurrentCurrencies() {
    for(let i = 0; i < 2; i++) {
      this.currency.getCurrencyData(i < 1 ? "USD" : "EUR").subscribe(data => {
        this.currJSON = JSON.stringify(data);
        this.currJSON = JSON.parse(this.currJSON);

        i < 1 
          ? this.currentDollar = this.currJSON.rates.UAH.toFixed(2)
          : this.currentEuro = this.currJSON.rates.UAH.toFixed(2);
      })
    }
  }

  convert(digit: number) {
    this.numberToConvert = digit;
    if(this.leftToRight)
    this.currency.getCurrencyData(this.leftCurrency).subscribe(data => {
      this.currJSON = JSON.stringify(data);
      this.currJSON = JSON.parse(this.currJSON);
      if (this.rightCurrency === 'USD') {
        let outcome = +this.currJSON.rates.USD * this.numberToConvert;
        this.result = outcome.toFixed(2);
      }
      if (this.rightCurrency === 'EUR') {
        let outcome = +this.currJSON.rates.EUR * this.numberToConvert;
        this.result = outcome.toFixed(2);
      }
      if (this.rightCurrency === 'UAH') {
        let outcome = +this.currJSON.rates.UAH * this.numberToConvert;
        this.result = outcome.toFixed(2);
      }
      })
    if(!this.leftToRight)
      this.currency.getCurrencyData(this.rightCurrency).subscribe(data => {
      this.currJSON = JSON.stringify(data);
      this.currJSON = JSON.parse(this.currJSON);
      if (this.leftCurrency === 'USD') {
        let outcome = +this.currJSON.rates.USD * this.numberToConvert;
        this.result = outcome.toFixed(2);
      }
      if (this.leftCurrency === 'EUR') {
        let outcome = +this.currJSON.rates.EUR * this.numberToConvert;
        this.result = outcome.toFixed(2);
      }
      if (this.leftCurrency === 'UAH') {
        let outcome = +this.currJSON.rates.UAH * this.numberToConvert;
        this.result = outcome.toFixed(2);
      }
      })
  }

  ngOnInit() {
    this.getCurrentCurrencies();
  }
}
