import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subject, Subscription, Observable, combineLatest, of } from "rxjs";
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

  public searchTermByCharacters: Subject<string> = new Subject<string>(); // Adjusted to `public`
  public planetAndCharactersResults$: Observable<string[]> = of([]); // Default to an empty observable
  public subscriptions: Subscription[] = []; // Adjusted to `public`
  public isLoading: boolean = false;

  constructor(private mockDataService: MockDataService) {}

  ngOnInit(): void {
    const charactersInputSubscription = this.searchTermByCharacters
      .pipe(
        debounceTime(300),
        filter((value: string) => value.length >= 3)
      )
      .subscribe((searchTerm: string) => {
        this.mockDataService.getCharacters(searchTerm).subscribe();
      });

    this.initLoadingState();

    this.subscriptions.push(charactersInputSubscription);
  }

  public changeCharactersInput(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.searchTermByCharacters.next(inputValue);
  }

  public loadCharactersAndPlanets(): void {
    this.planetAndCharactersResults$ = combineLatest([
      this.mockDataService.getCharacters(""),
      this.mockDataService.getPlanets(),
    ]).pipe(
      map(([characters, planets]) => {
        const characterNames = characters.map((c: any) => c.name);
        const planetNames = planets.map((p: any) => p.name);
        return [...characterNames, ...planetNames];
      })
    );
  }

  public initLoadingState(): void {
    combineLatest([
      this.mockDataService.getCharactersLoader(),
      this.mockDataService.getPlanetLoader(),
    ])
      .pipe(map((loaderStates) => areAllValuesTrue(loaderStates)))
      .subscribe((loadingState) => {
        this.isLoading = loadingState;
      });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
