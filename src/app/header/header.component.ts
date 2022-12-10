import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  dollar: number = 0;
  euro: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getCurrencyData('UAH');
  }

  define(data: any) {
    this.dollar = 1 / data['rates']['USD'];
    this.euro = 1 / data['rates']['EUR'];

    this.dollar = +this.dollar.toFixed(2);
    this.euro = +this.euro.toFixed(2);
}

  getCurrencyData(currency: string) {
      let url = `https://api.exchangerate.host/latest?base=${currency}`;
      this.http.get(url).subscribe((data: any) => {this.define(data)})
  }
}