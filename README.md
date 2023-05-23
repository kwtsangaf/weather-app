# WeatherApp

## Checklist
- [ ] Main Screen
  - [ ] weather of current location with name of the city, highlighting today temperature, rain, etc..
  - [ ] an overview with no specific details
  - [ ] search feature, by city
- [ ] Details page
  - [ ] a new page with more details, such as wind, humidity, pressure, visibility
  - [ ] add a chart with a daily forecast by hour

## Project Design

### Libraries and packages
- [weather api](https://open-meteo.com/)
- [angular 15](https://angular.io/docs)
- [angular material](https://material.angular.io/)
- [chart.js](https://www.chartjs.org/docs/latest/)

### Tasks
- Detect current location
- Call forecast API with hour and with daily respectively
- Call geocoding API for search feature
- construct line chart for various factors
- implement UI test if time allowed

### Improvements

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.
