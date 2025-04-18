import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { mockedAuthorsList } from "../../../shared/mocks/mocks"; // Adjust path as needed

@Component({
  selector: "app-course-form",
  templateUrl: "./course-form.component.html",
  styleUrls: ["./course-form.component.scss"],
})
export class CourseFormComponent implements OnInit {
  constructor(public fb: FormBuilder, public library: FaIconLibrary) {
    library.addIconPacks(fas);
    this.totalAuthors = [...mockedAuthorsList]; // Clone to avoid mutating original
  }

  courseForm!: FormGroup;
  totalAuthors: { id: string; name: string }[]; // All authors from mock
  courseAuthors: { id: string; name: string }[] = []; // Not used anymore, replaced by FormArray

  ngOnInit() {
    this.createCourseForm();
  }

  createCourseForm() {
    this.courseForm = this.fb.group({
      title: ["", [Validators.required, Validators.minLength(2)]],
      description: ["", [Validators.required, Validators.minLength(2)]],
      authors: this.fb.array([]), // FormArray for course authors
      newAuthor: this.fb.group({
        name: [
          "",
          [Validators.minLength(2), Validators.pattern("^[a-zA-Z0-9 ]+$")],
        ],
      }),
      duration: [null, [Validators.required, Validators.min(0)]],
    });
  }

  get authors(): FormArray {
    return this.courseForm.get("authors") as FormArray;
  }

  get availableAuthors() {
    const selectedIds = this.authors.controls.map(
      (control) => control.value.id
    );
    return this.totalAuthors.filter(
      (author) => !selectedIds.includes(author.id)
    );
  }

  addAuthorToCourse(author: { id: string; name: string }) {
    this.authors.push(
      this.fb.group({
        id: [author.id],
        name: [author.name],
      })
    );
  }

  removeAuthorFromCourse(index: number) {
    this.authors.removeAt(index);
  }

  createAuthor() {
    const newAuthorName = this.courseForm.get("newAuthor.name")?.value?.trim();
    if (newAuthorName && this.courseForm.get("newAuthor")?.valid) {
      const newAuthor = {
        id: Date.now().toString(),
        name: newAuthorName,
      };
      this.totalAuthors.push(newAuthor);
      this.courseForm.get("newAuthor")?.reset();
    }
  }

  onSubmit() {
    if (this.courseForm.valid) {
      const formValue = {
        ...this.courseForm.value,
      };
      console.log("Course form submitted:", formValue);
    } else {
      this.courseForm.markAllAsTouched();
    }
  }
}
