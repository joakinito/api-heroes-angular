import { Component, OnInit } from '@angular/core';
import { MarvelService } from '../servicios/marvel.service';
import { Hero } from '../../interfaces/hero';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  pageSize = 20; 

  constructor(private marvelService: MarvelService, private router: Router) {}

  public ngOnInit(): void {
    this.getHeroesByPage(1); 
  }

  public getHeroesByPage(page: number): void {
    const offset = (page - 1) * this.pageSize;
    this.marvelService.getTopHeroes(offset, this.pageSize)
      .subscribe(heroes => this.heroes = heroes);
  }

  public gotoDetail(heroId: number): void {
    this.router.navigate(['/detail', heroId]);
  }
}
