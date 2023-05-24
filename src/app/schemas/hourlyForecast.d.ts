export interface HourlyForecast {
  latitude: number
  longitude: number
  generationtimeMs: number
  utcOffsetSeconds: number
  timezone: string
  timezoneAbbreviation: string
  elevation: number
  currentWeather: CurrentWeather
  hourlyUnits: HourlyUnits
  hourly: Hourly
}

export interface CurrentWeather {
  temperature: number
  windspeed: number
  winddirection: number
  weathercode: number
  isDay: number
  time: string
}

export interface HourlyUnits {
  time: string
  temperature2M: string
  relativehumidity2M: string
  rain: string
  pressureMsl: string
  surfacePressure: string
  visibility: string
  windspeed10M: string
}

export interface Hourly {
  time: string[]
  temperature2M: number[]
  relativehumidity2M: number[]
  rain: number[]
  pressureMsl: number[]
  surfacePressure: number[]
  visibility: number[]
  windspeed10M: number[]
}
