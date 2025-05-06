import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CoursesListComponent } from "./courses-list.component";
import { Router } from "@angular/router";
import { CoursesFacade } from "@app/store/courses/courses.facade";
import { UserStoreService } from "@app/user/services/user-store.service";
import { of } from "rxjs";

describe("CoursesListComponent", () => {
  let component: CoursesListComponent;
  let fixture: ComponentFixture<CoursesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesListComponent],
      providers: [
        {
          provide: Router,
          useValue: { navigate: jest.fn() },
        },
        {
          provide: CoursesFacade,
          useValue: {
            allCourses$: of([]),
            getAllCourses: jest.fn(),
            getSingleCourse: jest.fn(),
            getFilteredCourses: jest.fn(),
            deleteCourse: jest.fn(),
          },
        },
        {
          provide: UserStoreService,
          useValue: {
            isAdmin: of(true),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CoursesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
