import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: "windDirection"
})
export class WindDirectionPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    var val = Math.floor((value / 22.5) + 0.5);
    var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return arr[(val % 16)];
  }

}
