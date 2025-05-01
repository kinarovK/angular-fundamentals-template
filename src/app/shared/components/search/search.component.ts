import { Component, Output, Input, EventEmitter } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
  standalone: true,
  imports: [FormsModule, ButtonComponent],
})
export class SearchComponent {
  // Use the name `placeholder` for the @Input.
  // Use the name `search` for the @Output.
  @Input() placeholder: string = "Enter text";
  @Output() searchEvent = new EventEmitter<string>();

  searchText: string = "";
  onSubmit(): void {
    this.searchEvent.emit(this.searchText);
  }
}
