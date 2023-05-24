import { Component } from '@angular/core';
import {WeatherService} from "../weather.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  cityName: string = '';
  temperature?: number;
  rain?: number;

  constructor(private weatherService: WeatherService, private route: ActivatedRoute) { }

  ngOnInit() {
    // Simulating data retrieval from a weather service
    this.cityName = 'New York';
    this.temperature = 24;
    this.rain = 30;

    this.route.params.subscribe(params => {
      console.log(params)
      this.cityName = params['city'];
    });
  }
}
