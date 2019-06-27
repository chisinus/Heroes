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

  // selectedHero: Hero;
  heroes: Hero[];

  constructor(private heroService: HeroService) {
  }

  ngOnInit() {
    this.heroService.getHeros()
      .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    this.heroService.addHero(name).subscribe(hero => { this.heroes.push(hero); });
  }

  deleteHero(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h.id !== hero.id);
    this.heroService.deleteHero(hero.id).subscribe();
  }
}
