import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';
import { MessageService } from './message.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroUrl = "http://localhost:58860/api/hero";
  private url;

  constructor(private http: HttpClient, 
              private messageService: MessageService) { }

  getHeros(): Observable<Hero[]> {
    this.messageService.add("HeroService: fetched heroes");
    //return of(HEROES); // of(HEROES) returns an Observable<Hero[]> that emits a single value, the array of mock heroes.
    this.url = this.heroUrl + "/GetHeroes";
    return this.http.get<Hero[]>(this.url);
//                    .pipe()
  }

  getHero(id: number): Observable<Hero> {
    this.messageService.add(`Hero Service: fetched hero. id=${id}`);

    this.url = this.heroUrl + "/GetHero/" + id;
    //return of(HEROES.find(hero=>hero.id===id));
    return this.http.get<Hero>(this.url);
  }
}
