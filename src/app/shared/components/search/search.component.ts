import { Component, Output, Input, EventEmitter } from "@angular/core";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent {
  // Use the name `placeholder` for the @Input.
  // Use the name `search` for the @Output.
  @Input() placeholder: string = "Enter text";
  @Output() searchClicked = new EventEmitter<string>();
  inputValue: string = "";
  onSearchClick() {
    this.searchClicked.emit(this.inputValue.trim());
  }
}
