import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../../interfaces/hero';
import { MarvelService } from '../servicios/marvel.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
  hero: Hero | undefined;
  heroId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private marvelService: MarvelService,
    private location: Location
  ) {}

  public ngOnInit(): void {
    this.getHero();
  }

  public getHero(): void {
    this.heroId = Number(this.route.snapshot.paramMap.get('id'));
    this.marvelService.getHeroById(this.heroId)
      .subscribe(hero => this.hero = hero);
  }

  public goBack(): void {
    window.history.back();
  }
}
