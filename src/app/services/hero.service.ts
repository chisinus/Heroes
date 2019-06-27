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
  private url;

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

  updateHero(hero: Hero): Observable<any> {
    this.url = this.url = `${this.heroUrl}/GetHero/${hero.id}/${hero.name}`;
    return this.http.put(this.url, hero, httpOptions)
                    .pipe(
                      tap(_ => this.log(`updated hero. id=${hero.id}`)),
                      catchError(this.handleError<any>('updateHero'))
                    );
  }

  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroUrl}/DeleteHero/${id}`;

    return this.http.delete<Hero>(url, httpOptions)
                    .pipe(
                      tap(_ => this.log(`deleted hero id=${id}`)),
                      catchError(this.handleError<Hero>('deleteHero'))
                    );
  }

 /*
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed. ${error.message}`);

      return of(result as T);
    }
  }

  log(msg: string) {
    this.messageService.add(`HeroService: ${msg}`);
  }
}
