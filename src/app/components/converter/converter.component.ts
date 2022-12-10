import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent {

  // currJSON: any = [];
  leftCurrency = 'USD';
  rightCurrency = 'UAH';
  result: string = '';
  leftToRight: boolean = true;

  changeLeftCurrency(cur: any) {
    this.leftCurrency = cur.value;
  }

  changeRightCurrency(cur: any) {
    this.rightCurrency = cur.value;
  }

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getCurrencyData("USD");
  }

  define(data: any) {
    // this.test = data['rates'];
    // this.test2 = Object.keys(this.test)
  }

  getCurrencyData(currency: string) {
      let url = `https://api.exchangerate.host/latest?base=${currency}`;
      this.http.get(url).subscribe((data: any) => {this.define(data)})
  }

  convert(digit: any) {
    let numberToConvert = +digit.value;

    // this.http.getCurrencyData(this.leftToRight ? this.leftCurrency : this.rightCurrency).subscribe(data => {
    //   this.currJSON = JSON.stringify(data);
    //   this.currJSON = JSON.parse(this.currJSON);

    //   console.log(data)

    //   if (
    //     this.leftToRight 
    //       ? this.rightCurrency === 'USD' 
    //       : this.leftCurrency === 'USD'
    //     ) {
    //     let outcome = +this.currJSON.rates.USD * numberToConvert;
    //     this.result = outcome.toFixed(2);

    //   } else if (        
    //     this.leftToRight 
    //       ? this.rightCurrency === 'EUR' 
    //       : this.leftCurrency === 'EUR'
    //     ) {
    //     let outcome = +this.currJSON.rates.EUR * numberToConvert;
    //     this.result = outcome.toFixed(2);
        
    //   } else if (
    //     this.leftToRight 
    //       ? this.rightCurrency === 'UAH' 
    //       : this.leftCurrency === 'UAH'
    //   ) {
    //     let outcome = +this.currJSON.rates.UAH * numberToConvert;
    //     this.result = outcome.toFixed(2);
    //   }
    //   })
  }
}
