import { Component } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl,
} from "@angular/forms";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-course-form",
  templateUrl: "./course-form.component.html",
  styleUrls: ["./course-form.component.scss"],
})
export class CourseFormComponent {
  constructor(public fb: FormBuilder, public library: FaIconLibrary) {
    library.addIconPacks(fas);
    this.courseForm = this.fb.group({
      title: ["", [Validators.required, Validators.minLength(2)]],
      description: ["", [Validators.required, Validators.minLength(2)]],
      authors: this.fb.array([]), // We'll use a FormArray for course authors
      duration: [0, [Validators.required, Validators.min(0)]],
      newAuthor: this.fb.group({
        name: [
          "",
          [Validators.pattern("^[a-zA-Z0-9]*$"), Validators.minLength(2)],
        ],
      }),
    });
  }
  courseForm!: FormGroup;
  authorsList: Array<{ id: number; name: string }> = []; // List of all authors
  courseAuthors: Array<{ id: number; name: string }> = []; // Authors added to the course
  newAuthorId = 1; // Counter for generating author IDs
  // Use the names `title`, `description`, `author`, 'authors' (for authors list), `duration` for the form controls.

  get authors(): FormArray {
    return this.courseForm.get("authors") as FormArray;
  }
  addAuthor(author: { id: number; name: string }) {
    // Remove from authorsList and add to courseAuthors
    this.courseAuthors.push(author);
    this.authorsList = this.authorsList.filter((a) => a.id !== author.id);

    // Add to authors FormArray
    this.authors.push(this.fb.control(author));
  }

  deleteAuthor(index: number) {
    const removedAuthor = this.authors.at(index).value;
    this.courseAuthors = this.courseAuthors.filter(
      (a) => a.id !== removedAuthor.id
    );

    // Add back to authorsList
    this.authorsList.push(removedAuthor);
    this.authors.removeAt(index);
  }

  createAuthor() {
    const authorName = this.courseForm.get("newAuthor.name")?.value;

    if (authorName?.invalid) {
      return; // Do nothing if the name input is invalid
    }
    console.log(authorName);
    const newAuthor = {
      id: this.newAuthorId++, // Increment unique ID
      name: authorName,
    };

    this.authorsList.push(newAuthor);
    this.courseForm.get("newAuthor.name")?.reset(); // Clear the input field
  }
  isControlInvalid(controlName: string): boolean | undefined {
    const control = this.courseForm.get(controlName);
    return control?.invalid && (control.touched || control.dirty);
  }

  onSubmit() {
    console.log("submited");
  }
}
