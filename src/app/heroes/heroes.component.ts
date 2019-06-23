import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';
import { HeroService } from '../services/hero.service';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  selectedHero: Hero;
  heroes : Hero[];

  constructor(private heroService: HeroService) { 
  }

  ngOnInit() {
    console.log('123');
    this.heroService.getHeros()
        .subscribe(heroes=>this.heroes=heroes);
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

}
