import { Component, OnInit } from '@angular/core';
import { MAP_SETTINGS, BASE_SATION } from '../../const';

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
  public S = 0;

  public addMode: boolean = false;

  public editMode: boolean = false;

  public baseStation = BASE_SATION;
  public styles = MAP_SETTINGS;

  ngOnInit() {
    this.calcAllS();
  }
  public lineChartData:Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
    {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
  ];
  public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
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
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
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
    }
  }

  isInfoWindowOpen(id) {
    return this.openedWindow == id;
  }

  markerClicked(id) {
    this.openedWindow = id;
    setInterval(()=>{
      this.randomize();
    }, 5000);
  }

  addBS(){
    this.addMode = !this.addMode
  }
  saveMarker(item){
    console.log(item);
    if (!this.editMode) {
      this.openedWindow = null;
    }

      // this.editMode = true;
  }

  deleteBS(id){
    this.baseStation= this.baseStation.filter(item => {
      return item.id !== id;
    })
    console.log(this.baseStation);

  }

  calcAllS (){
    let sum = 0;
    this.baseStation.forEach(item => {
      sum += 3.14 * item.rad/ 1000 * item.rad/ 1000;
    })
    this.S = sum;
  }

}
