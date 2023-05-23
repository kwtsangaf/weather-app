import { Component } from '@angular/core';
import {WeatherService} from "../weather.service";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  cityName: string = '';
  temperature?: number;
  rain?: number;

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    // Simulating data retrieval from a weather service
    this.cityName = 'New York';
    this.temperature = 24;
    this.rain = 30;
  }
}
