import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {DailyForecast} from "./schemas/dailyForecast";
import camelcaseKeys from "camelcase-keys";
import {map, Observable} from "rxjs";
import {HourlyForecast} from "./schemas/hourlyForecast";

@Injectable({
  providedIn: "root"
})
export class WeatherService {
  apiPrefix = "https://api.open-meteo.com/v1";

  constructor(private http: HttpClient) {
  }

  getDailyData(lat: number, long: number): Observable<DailyForecast> {
    return this.http.get(`${this.apiPrefix}/forecast?latitude=${lat}&longitude=${long}&daily=temperature_2m_max,temperature_2m_min,rain_sum&forecast_days=1&timezone=America%2FNew_York`)
      .pipe(
        map(response => this.adapt(response))
      );
  }

  getHourlyData(lat: number, long: number): Observable<HourlyForecast> {
    return this.http.get(`${this.apiPrefix}/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,relativehumidity_2m,rain,pressure_msl,surface_pressure,visibility,windspeed_10m&current_weather=true&forecast_days=1&timezone=America%2FNew_York`)
      .pipe(
        map(response => this.adapt(response) as HourlyForecast),
        map(response => {
          // group current weather info by picking up data from various parameters
          let curTime = response.currentWeather.time;
          let idx = response.hourly.time.findIndex(t => t === curTime);
          let snapshot = {
            humidity: response.hourly.relativehumidity2M[idx],
            rain: response.hourly.rain[idx],
            pressureMsl: response.hourly.pressureMsl[idx],
            surfacePressure: response.hourly.surfacePressure[idx],
            visibility: response.hourly.visibility[idx]
          };

          return {
            ...response,
            snapshot,
          };
        })
      );
  }


  private adapt(response: any) {
    return camelcaseKeys(response, {deep: true});
  }
}
