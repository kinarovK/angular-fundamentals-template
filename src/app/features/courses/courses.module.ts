import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CoursesComponent } from "./courses.component";
import { CoursesListComponent } from "./courses-list/courses-list.component";

@NgModule({
  declarations: [CoursesComponent, CoursesListComponent],
  imports: [CommonModule],
  exports: [CoursesComponent],
})
export class CoursesModule {}
