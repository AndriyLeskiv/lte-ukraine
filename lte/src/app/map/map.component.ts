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

  public addMode: boolean = false;

  public editMode: boolean = false;

  public baseStation = BASE_SATION;
  public styles = MAP_SETTINGS;
  
  ngOnInit() {

  }

  mapClicked($event) {
    if(this.addMode) {
      alert('add BS')
      this.baseStation.push({
        lat: $event.coords.lat,
        lng: $event.coords.lng,
        rad: 10000,
        id: this.baseStation.length + 2
      });
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

  deleteBS(id){
    this.baseStation= this.baseStation.filter(item => {
      return item.id !== id;
    })
  }

}
