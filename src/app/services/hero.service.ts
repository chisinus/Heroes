import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  constructor(private messageService: MessageService) { }

  getHeros(): Observable<Hero[]> {
    this.messageService.add("HeroService: fetched heroes");
    return of(HEROES); // of(HEROES) returns an Observable<Hero[]> that emits a single value, the array of mock heroes.
  }

  getHero(id: number): Observable<Hero> {
    this.messageService.add(`Hero Service: fetched hero. id=${id}`);
    return of(HEROES.find(hero=>hero.id===id));
  }
}
