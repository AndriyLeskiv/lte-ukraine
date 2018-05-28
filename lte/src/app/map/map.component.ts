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
  public lat: number = 48.8;
  public lng: number = 30.5;
  public openedWindow : number = 0; 
  public S = 0;
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
 
  public randomize():void {
    let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = this.randomNum(_lineChartData[i].data[j-1], 3000, 450);
      }
    }
    this.lineChartData = _lineChartData;
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
 
  mapClicked($event) {
    if(this.addMode) {
      this.addMode = false
      this.baseStation.push({
        lat: $event.coords.lat,
        lng: $event.coords.lng,
        rad: 0,
        id: this.baseStation.length + 2
      });
      this.openedWindow = this.baseStation.length + 1;
      this.editMode = true;
      this.hideMode = true;
    }
  }

  isInfoWindowOpen(id) {
    return this.openedWindow == id;
  }

  markerClicked(id) {
    this.openedWindow = id;
    this.randomize();
  }

  realTimeGen(value){
    if(!value){
      this.interval = setInterval(this.randomize(), 5000);
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
    }
  }

  deleteBS(id){
    this.baseStation= this.baseStation.filter(item => {
      return item.id !== id;
    })
  }

  calcAllS (){
    let sum = 0;
    this.baseStation.forEach(item => {
      sum += 3.14 * item.rad/ 1000 * item.rad/ 1000;
    })
    this.S = sum;
  }
}
