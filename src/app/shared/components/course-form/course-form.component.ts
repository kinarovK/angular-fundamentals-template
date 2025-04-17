import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
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
  }

  courseForm!: FormGroup;
  availableAuthors: { id: number; name: string }[] = [
    // Initial set of authors
    { id: 1, name: "Author One" },
    { id: 2, name: "Author Two" },
  ];
  courseAuthors: { id: number; name: string }[] = []; // Empty initially

  // Initialize the form
  createCourseForm() {
    this.courseForm = this.fb.group({
      title: ["", [Validators.required, Validators.minLength(2)]],
      description: ["", [Validators.required, Validators.minLength(2)]],
      authors: this.fb.array([]), // FormArray for authors management
      newAuthor: this.fb.group({
        name: [
          "",
          [Validators.minLength(2), Validators.pattern("^[a-zA-Z0-9 ]+$")],
        ],
      }),
      duration: [null, [Validators.required, Validators.min(0)]], // Minutes, must be >= 0
    });
  }

  // Getter for authors FormArray
  get authors(): FormArray {
    return this.courseForm.get("authors") as FormArray;
  }

  // Add an author to Course Authors List
  addAuthorToCourse(author: { id: number; name: string }) {
    const index = this.availableAuthors.findIndex((a) => a.id === author.id);
    if (index !== -1) {
      // Move the author from Available Authors to Course Authors
      this.courseAuthors.push(author);
      this.availableAuthors.splice(index, 1);
    }
  }

  // Remove an author from Course Authors List
  removeAuthorFromCourse(author: { id: number; name: string }) {
    const index = this.courseAuthors.findIndex((a) => a.id === author.id);
    if (index !== -1) {
      // Move the author from Course Authors back to Available Authors
      this.availableAuthors.push(author);
      this.courseAuthors.splice(index, 1);
    }
  }

  // Create a New Author
  createAuthor() {
    const newAuthorName = this.courseForm.get("newAuthor.name")?.value;
    if (newAuthorName.trim() && this.courseForm.get("newAuthor")?.valid) {
      const newAuthor = {
        id: Date.now(), // Generate a unique ID
        name: newAuthorName,
      };
      this.availableAuthors.push(newAuthor); // Add to Available Authors
      this.courseForm.get("newAuthor")?.reset(); // Clear the newAuthor input
    }
  }

  // Submit the form
  onSubmit() {
    if (this.courseForm.valid) {
      console.log("Course form submitted:", this.courseForm.value);
    } else {
      this.courseForm.markAllAsTouched(); // Show all errors
    }
  }
}
