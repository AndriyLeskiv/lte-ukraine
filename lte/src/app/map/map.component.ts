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
  public lat: number = 48.8;
  public lng: number = 30.5;
  public openedWindow : number = 0; 
  public S = 0;

  public addMode: boolean = false;

  public editMode: boolean = false;

  public baseStation = BASE_SATION;
  public styles = MAP_SETTINGS;
  
  ngOnInit() {
    this.calcAllS();
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
