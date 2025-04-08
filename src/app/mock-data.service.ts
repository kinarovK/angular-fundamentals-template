import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MockDataService {
  private characterLoaderSubject = new Subject<boolean>();
  private planetLoaderSubject = new Subject<boolean>();
  getCharacters(searchTerm: string): Observable<any[]> {
    this.characterLoaderSubject.next(true);
    const mockCharacters = [
      { id: 1, name: "Character 1", info: "Details about Character 1" },
      { id: 2, name: "Character 2", info: "Details about Character 2" },
      { id: 3, name: "Character 3", info: "Details about Character 3" },
    ].filter((character) =>
      character.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setTimeout(() => this.characterLoaderSubject.next(false), 500);
    return new Observable((observer) => {
      observer.next(mockCharacters);
      observer.complete();
    });
  }

  getPlanets(): Observable<any[]> {
    this.planetLoaderSubject.next(true);
    const mockPlanets = [
      { id: 1, name: "Planet 1", info: "Details about Planet 1" },
      { id: 2, name: "Planet 2", info: "Details about Planet 2" },
      { id: 3, name: "Planet 3", info: "Details about Planet 3" },
    ];
    setTimeout(() => this.planetLoaderSubject.next(false), 500); // Simulate request completion
    return new Observable((observer) => {
      observer.next(mockPlanets);
      observer.complete();
    });
  }

  getCharactersLoader(): Observable<boolean> {
    return this.characterLoaderSubject.asObservable();
  }

  getPlanetLoader(): Observable<boolean> {
    return this.planetLoaderSubject.asObservable();
  }
}
