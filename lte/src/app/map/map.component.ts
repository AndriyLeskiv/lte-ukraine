import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lte-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor() { }

  title: string = 'Розташування Базових станцій';
  lat: number = 48.8;
  lng: number = 30.5;

  public baseStation = [
    {
      lat: 48.8,
      lng: 30.5,
      rad: 5000
    },
    {
      lat: 48.2,
      lng: 30.5,
      rad: 40000
    },
    {
      lat: 48.5,
      lng: 30.0,
      rad: 10000
    },
    {
      lat: 48.5,
      lng: 30.2,
      rad: 10000
    }
  ]

  ngOnInit() {
  }

}
