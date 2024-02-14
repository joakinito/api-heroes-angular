import { Component, OnInit } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { MarvelService } from '../servicios/marvel.service';
import { Hero } from '../../interfaces/hero';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]> | undefined;
  private searchTerms = new Subject<string>();

  constructor(private marvelService: MarvelService) {}

  public ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      debounceTime(600),
      distinctUntilChanged(),
      switchMap((term: string) => {
        if (term.length >= 3) {
          return this.searchHeroes(term).pipe(
            map(heroes => heroes.slice(0, 5))
          );
        } else {
          return of([] as Hero[]);
        }
      })
    );
  }

  public search(term: string): void {
    this.searchTerms.next(term);
  }

  public searchHeroes(term: string): Observable<Hero[]> {
    return this.marvelService.searchHeroesByName(term);
  }
}
