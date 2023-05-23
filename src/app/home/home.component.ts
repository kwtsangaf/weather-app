import { Component } from '@angular/core';
import {WeatherService} from "../weather.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
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
