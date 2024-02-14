import { Component, OnInit } from '@angular/core';
import { HeroService } from '../servicios/hero.service';
import { Hero } from '../../interfaces/hero';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  currentPage = 1;
  pageSize = 20; 

  constructor(private heroService: HeroService) {}

   public ngOnInit(): void {
    this.loadFirstTwentyHeroes();
  }

   public loadFirstTwentyHeroes(): void {
    const offset = (this.currentPage - 1) * this.pageSize;
    this.heroService.getFirstTwentyHeroes(offset, this.pageSize)
      .subscribe(heroes => this.heroes = heroes);
  }

   public nextPage(): void {
    this.currentPage++;
    this.loadFirstTwentyHeroes();
  }

   public prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadFirstTwentyHeroes(); 
    }
  }
}
