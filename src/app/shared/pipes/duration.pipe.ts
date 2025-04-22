import { Pipe } from "@angular/core";

@Pipe({
  name: "duration",
})
export class DurationPipe {
  // Add your code here
  transform(value: number): string {
    let hours = Math.floor(value / 60);
    var minutes = value % 60;
    if (hours <= 1) {
      return `${hours}:${minutes} hour`;
    }
    return `${hours}:${minutes} hours`;
  }
}
