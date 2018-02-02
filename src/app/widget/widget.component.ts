import { Component, OnInit, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent implements OnInit,OnChanges {
  private baseUrl = "http://api.fixer.io/latest?symbols=USD,CAD";
  public exchange:any = {};
  converstionRateWithEUR = null;
  exchangeRatesByType:any = {};
  
  constructor(private http: HttpClient) { 
      this.http.get(this.baseUrl).subscribe(data => { this.converstionRateWithEUR = data;
        this.updateExchangeRate(data);
      });
  }

  ngOnInit() {
  }

  updateExchangeRate(data){
    this.exchangeRatesByType['EUR'] = 1;
    this.exchangeRatesByType['CAD'] = data.rates.CAD;
    this.exchangeRatesByType['USD'] = data.rates.USD;
  }

  ngOnChanges(changes) {
    console.log("testing.....chnage");
  }

  fromValueHandler(e){
    console.log(e);
  }

  fromTypeHandler(e){
    console.log(e);
  }

  toValueHandler(e){
    console.log(e);
  }

  toTypeHandler(){
    this.updateConvertedAmount();
  }

  updateConvertedAmount(){
    this.exchange.toCurrValue =  Number(this.exchange.fromCurrValue)*Number(this.exchangeRatesByType[this.exchange.toCurrType])/Number(this.exchangeRatesByType[this.exchange.fromCurrType]);
  }

  disclaimer(){
    alert("Exchange Rate From EUR: USD"+ this.exchangeRatesByType['USD'] )
  }
}
