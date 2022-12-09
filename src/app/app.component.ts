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
  currentDollar: number = 0;
  currentEuro: number = 0;
  leftToRight: boolean = true;


  changeLeftCurrency(cur: string) {
    this.leftCurrency = cur;
  }

  changeRightCurrency(cur: string) {
    this.rightCurrency = cur;
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
    let numberToConvert = digit;

    this.currency.getCurrencyData(this.leftToRight ? this.leftCurrency : this.rightCurrency).subscribe(data => {
      this.currJSON = JSON.stringify(data);
      this.currJSON = JSON.parse(this.currJSON);

      if (
        this.leftToRight 
          ? this.rightCurrency === 'USD' 
          : this.leftCurrency === 'USD'
        ) {
        let outcome = +this.currJSON.rates.USD * numberToConvert;
        this.result = outcome.toFixed(2);

      } else if (        
        this.leftToRight 
          ? this.rightCurrency === 'EUR' 
          : this.leftCurrency === 'EUR'
        ) {
        let outcome = +this.currJSON.rates.EUR * numberToConvert;
        this.result = outcome.toFixed(2);
        
      } else if (
        this.leftToRight 
          ? this.rightCurrency === 'UAH' 
          : this.leftCurrency === 'UAH'
      ) {
        let outcome = +this.currJSON.rates.UAH * numberToConvert;
        this.result = outcome.toFixed(2);
      }
      })
  }

  ngOnInit() {
    this.getCurrentCurrencies();
  }
}
