export interface DailyForecast {
  latitude: number
  longitude: number
  generationtimeMs: number
  utcOffsetSeconds: number
  timezone: string
  timezoneAbbreviation: string
  elevation: number
  dailyUnits: DailyUnits
  daily: Daily
}

export interface DailyUnits {
  time: string
  temperature2MMax: string
  temperature2MMin: string
  rainSum: string
}

export interface Daily {
  time: string[]
  temperature2MMax: number[]
  temperature2MMin: number[]
  rainSum: number[]
}
