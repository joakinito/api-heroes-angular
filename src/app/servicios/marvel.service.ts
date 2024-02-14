import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MarvelResponse } from '../../interfaces/marvel-response';
import { Hero } from '../../interfaces/hero';
import { Md5 } from 'ts-md5';

@Injectable({
  providedIn: 'root'
})
export class MarvelService {
  private apiUrl = 'https://gateway.marvel.com/v1/public/characters';
  private ts = Date.now().toString();
  private apiKey = '0815dd9509b6494531decf8319e4d5f0';
  private privateKey = '337fdf3d8ca8174799544039fd37114275b0eb10';
  private aleatorio: number; 

  constructor(private http: HttpClient) { 
    this.aleatorio = Math.floor(Math.random() * 1564); 
  }
    
   public getTopHeroes(aleatorio: number, pageSize: number): Observable<Hero[]> { 
    const hash = Md5.hashStr(this.ts + this.privateKey + this.apiKey);
    const url = `${this.apiUrl}?ts=${this.ts}&apikey=${this.apiKey}&hash=${hash}&offset=${this.aleatorio}&limit=${pageSize}`;
    return this.http.get<MarvelResponse>(url).pipe(
      map(response => response.data.results)
    );
  }

  public getHeroById(heroId: number): Observable<Hero> {
    const hash = Md5.hashStr(this.ts + this.privateKey + this.apiKey);
    const url = `${this.apiUrl}/${heroId}?ts=${this.ts}&apikey=${this.apiKey}&hash=${hash}`;
    return this.http.get<MarvelResponse>(url).pipe(
      map(response => response.data.results[0])
    );
  }


  

 public searchHeroesByName(name: string): Observable<Hero[]> {
    const hash = Md5.hashStr(this.ts + this.privateKey + this.apiKey);
    const url = `${this.apiUrl}?ts=${this.ts}&apikey=${this.apiKey}&hash=${hash}&nameStartsWith=${name}`;
    return this.http.get<MarvelResponse>(url).pipe(
      map(response => response.data.results)
    );
  }
}
