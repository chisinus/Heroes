import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Hero } from '../hero';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroUrl = 'http://localhost:58860/api/hero';
  private url: string;

  constructor(private http: HttpClient,
              private messageService: MessageService) { }

  getHeros(): Observable<Hero[]> {
    this.messageService.add('HeroService: fetched heroes');

    this.url = this.heroUrl + '/GetHeroes';
    return this.http.get<Hero[]>(this.url)
                    .pipe(catchError(this.handleError<Hero[]>('getHeroes', [])));
  }

  getHero(id: number): Observable<Hero> {
    this.messageService.add(`Hero Service: fetched hero. id=${id}`);

    // this.url = this.heroUrl + '/GetHero/' + id;
    this.url = `${this.heroUrl}/GetHero/${id}`;

    return this.http.get<Hero>(this.url)
                    .pipe(
                      tap(_ => this.log(`fetch hero. id = ${id}`)),
                      catchError(this.handleError<Hero>(`getHero id=${id}`))
                    );
  }

  addHero(name: string): Observable<Hero> {
    this.url = `${this.heroUrl}/AddHero`;

    return this.http.post(this.url, {name} as Hero, httpOptions)
                    .pipe(
                      tap(_ => this.log(`add hero ${name}`)),
                      catchError(this.handleError<any>('addHero'))
                    );
  }

  updateHero(hero: Hero): Observable<any> {
    this.url = `${this.heroUrl}/UpdateHero`;

    return this.http.put(this.url, hero, httpOptions)
                    .pipe(
                      tap(_ => this.log(`updated hero. id=${hero.id}`)),
                      catchError(this.handleError<any>('updateHero'))
                    );
  }

  deleteHero(id: number): Observable<Hero> {
    this.url = `${this.heroUrl}/DeleteHero/${id}`;

    return this.http.delete<Hero>(this.url, httpOptions)
                    .pipe(
                      tap(_ => this.log(`deleted hero id=${id}`)),
                      catchError(this.handleError<Hero>('deleteHero'))
                    );
  }

  searchHeroes(term: string): Observable<Hero[]>{
    this.url = `${this.heroUrl}/SearchHeroes/${term}`;
    console.log(this.url);
    if (!term.trim()) { return of([]); }

    return this.http.get<Hero[]>(this.url)
                    .pipe (
                        tap(_ => this.log(`Search: ${term}`)),
                        catchError(this.handleError<Hero[]>('search'))
                    );
  }

 /*
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed. ${error.message}`);

      return of(result as T);
    };
  }

  log(msg: string) {
    this.messageService.add(`HeroService: ${msg}`);
  }
}
