import { Component, OnInit } from '@angular/core';
import { MAP_SETTINGS, BASE_SATION } from '../../const';
import * as moment from 'moment';

@Component({
  selector: 'lte-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor() { }

  public title: string = 'Розташування Базових станцій 4G';
  public lat: number = 49.84050;
  public lng: number = 24.015694;
  public openedWindow : number = 0;
  public S;
  public addMode: boolean = false;
  public editMode: boolean = false;
  public baseStation = BASE_SATION;
  public styles = MAP_SETTINGS;
  public lineChartLabels=[];
  public lineChartOptions:any = {
    responsive: true
  };
  public realTime= false;
  public interval;
  public hideMode = false;
  
  ngOnInit() {
    this.calcAllS();
    this.createTimeRange()
  }
  createTimeRange(){
    let arr = [];
    for (let index = 7; index > 0; index--) {
      this.lineChartLabels.push(moment().subtract(index-1, 'hour').minutes(0).format("HH:mm"))
    }
  }

  public lineChartData:Array<any> = [
    {data: [56, 89, 180, 201, 256, 295, 240], label: 'Кількість абонентів'},
  ];
  
  public lineChartColors:Array<any> = [
    {
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: '#007bff',
      pointBackgroundColor: '#007bff',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  public randomize(item) {
    let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = this.randomNum(_lineChartData[i].data[j-1], item.rad, item.maxAbonents);
      }
    }
    this.lineChartData = _lineChartData;
    return _lineChartData;
  }

  randomNum(prev, rad, max){
    if(!prev){
      prev = Math.floor((Math.random() * max) + 1);
    }
    let random = Math.floor((Math.random() * 40) + 1);
    if(Math.abs(prev + random) > max) {
      return this.randomNum(prev-20, rad, max)
    }
    if(random%2) {
      return Math.abs(prev + random);
    } else {
      return Math.abs(prev - random);
    }
  }

  // events
  // public chartClicked(e:any):void {
  //   console.log(e);
  // }

  // public chartHovered(e:any):void {
  //   console.log(e);
  // }

  mapClicked($event) {
    if(this.addMode) {
      this.addMode = false
      this.baseStation.push({
        lat: $event.coords.lat,
        lng: $event.coords.lng,
        rad: this.genRandomRad(),
        id: this.baseStation[this.baseStation.length-1].id + 2,
        federHeight: 0,
        maxAbonents: 750,
        curentAbonents: 0
      });
      this.openedWindow = this.baseStation.length + 1;
      this.editMode = true;
      this.hideMode = true;
    }
  }

  genRandomRad() {
    return 900;
  }

  isInfoWindowOpen(id) {
    return this.openedWindow == id;
  }

  markerClicked(item) {
    this.openedWindow = item.id;
    if(!item.chart) {
      let a = this.randomize(item);
      item.chart = a;
    } else {
      this.lineChartData = item.chart;
    }
  }

  realTimeGen(value){
    if(!value){
      // this.interval = setInterval(this.randomize(), 5000);
    } else {
      clearInterval(this.interval);
    }
  }

  addBS(){
    this.addMode = !this.addMode
  }
  saveMarker(item){
    if (!this.editMode) {
      this.openedWindow = null;
      this.hideMode = false;
      this.calcAllS ();
    }
  }

  deleteBS(id){
    this.baseStation= this.baseStation.filter(item => {
      return item.id !== id;
    })
    this.calcAllS ();
  }

  calcAllS (){
    let sum = 0;
    this.baseStation.forEach(item => {
      sum += 3.14 * item.rad/ 1000 * item.rad/ 1000;
    })
    this.S = sum.toFixed(2);
  }
}
