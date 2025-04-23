import { Component, Input, Output, EventEmitter } from "@angular/core";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { fas, IconName, IconPack } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"],
})
export class ButtonComponent {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
  @Input() buttonText: string | undefined;
  @Input() iconName: IconName | undefined;
  @Input() type?: "button" | "submit" = "button";
  @Output() buttonClick = new EventEmitter<void>();
  // Use the names for the inputs `buttonText` and `iconName`.
  onClick(): void {
    this.buttonClick.emit();
  }
}
