import { Component, Input } from "@angular/core";

@Component({
  selector: "app-info",
  templateUrl: "./info.component.html",
  styleUrls: ["./info.component.scss"],
})
export class InfoComponent {
  @Input() title: string | undefined;
  @Input() description: string | undefined;
  @Input() id: string | undefined;
  @Input() creationDate: Date | undefined;
  @Input() duration: number | undefined;
  @Input() authors: string[] | undefined;
}
// Use the names `title` and `text`.
