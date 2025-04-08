import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  Subject,
  forkJoin,
  Subscription,
  Observable,
  combineLatest,
} from "rxjs";
import { filter, debounceTime, map } from "rxjs/operators";
import { MockDataService } from "./mock-data.service";
import { areAllValuesTrue } from "./utils";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, OnDestroy {
  title = "courses-app";
  private searchTermByCharacters: Subject<string> = new Subject<string>();
  private subscriptions: Subscription[] = [];
  planetAndCharactersResults$?: Observable<string[]>;
  isLoading: boolean = false;

  constructor(private mockDataService: MockDataService) {}

  ngOnInit(): void {
    const charactersInputSubscription = this.searchTermByCharacters
      .pipe(
        debounceTime(300),
        filter((value: string) => value.length >= 3)
      )
      .subscribe((searchTerm: string) => {
        this.mockDataService.getCharacters(searchTerm).subscribe((data) => {});
      });

    const loaderSubscription = combineLatest([
      this.mockDataService.getCharactersLoader(),
      this.mockDataService.getPlanetLoader(),
    ])
      .pipe(map((loaderStates: boolean[]) => areAllValuesTrue(loaderStates)))
      .subscribe((loadingState: boolean) => {
        this.isLoading = loadingState;
      });

    this.subscriptions.push(charactersInputSubscription);
    this.subscriptions.push(loaderSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  // Updated method to handle input with proper casting
  changeCharactersInput(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value; // Cast event.target to HTMLInputElement
    this.searchTermByCharacters.next(inputValue); // Emit the sanitized input value
  }

  loadCharactersAndPlanets(): void {
    this.planetAndCharactersResults$ = forkJoin([
      this.mockDataService.getCharacters(""),
      this.mockDataService.getPlanets(),
    ]).pipe(
      map(([characters, planets]) => {
        const characterNames = characters.map(
          (character: any) => character.name
        );
        const planetNames = planets.map((planet: any) => planet.name);
        return [...characterNames, ...planetNames];
      })
    );

    // Debug output
    this.planetAndCharactersResults$.subscribe((results) => {
      console.log("Combined Results:", results);
    });
  }
}
