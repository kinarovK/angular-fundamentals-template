import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "customDate",
})
export class CustomDatePipe implements PipeTransform {
  // Add your code here
  transform(value: any): string {
    let date: Date;
    if (value instanceof Date) {
      date = value;
    } else {
      date = new Date(value);
    }
    if (isNaN(date.getTime())) {
      console.error("Invalid date passed to CustomDatePipe:", value);
      return "Invalid Date";
    }
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let formatedDay = day.toString().padStart(2, "0");
    let fromatedMonth = month.toString().padStart(2, "0");
    return `${formatedDay}.${fromatedMonth}.${year}`;
  }
}
