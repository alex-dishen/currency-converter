import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent {

  currency: any;
  currencies: any;

  leftCurrency: string = 'USD';
  rightCurrency: string = 'UAH';

  result: any;
  leftToRight: boolean = true;

  ngOnInit() {
    this.getCurrencyData(this.leftCurrency);
  }

  changeLeftCurrency(cur: any) {
    this.leftCurrency = cur.value;
  }

  changeRightCurrency(cur: any) {
    this.rightCurrency = cur.value;
  }

  constructor(private http: HttpClient) {}

  getCurrencyData(currency: string) {
    let url = `https://api.exchangerate.host/latest?base=${currency}`;
    this.http.get(url).subscribe(data => this.currency = data);
    return this.http.get(url)
  }

  convert(digit: any) {
    let numberToConvert = +digit.value;
    if(numberToConvert === 0) {
      this.result = ''
      return
    };

    const convertFrom = this.leftToRight ? this.leftCurrency : this.rightCurrency;
    const convertTo = this.leftToRight ? this.rightCurrency : this.leftCurrency;

    this.getCurrencyData(convertFrom).subscribe( () => {
      this.result = this.currency['rates'][convertTo] * numberToConvert;
      this.result = this.result.toFixed(2);
    })
  }
}