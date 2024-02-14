import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MarvelResponse } from '../../interfaces/marvel-response';
import { Md5 } from 'ts-md5';
import { Hero } from '../../interfaces/hero';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {
  private apiUrl: string = 'https://gateway.marvel.com/v1/public/series';
  private ts: string;
  private apiKey: string;
  private privateKey: string;

  constructor(private http: HttpClient) {
    this.ts = Date.now().toString();
    this.apiKey = '0815dd9509b6494531decf8319e4d5f0';
    this.privateKey = '337fdf3d8ca8174799544039fd37114275b0eb10';
  }

  public getSeries(offset: number, pageSize: number): Observable<Hero[]> {
    const hash = Md5.hashStr(this.ts + this.privateKey + this.apiKey);
    const url: string = `${this.apiUrl}?ts=${this.ts}&apikey=${this.apiKey}&hash=${hash}&offset=${offset}&limit=${pageSize}`;
    return this.http.get<MarvelResponse>(url).pipe(
      map((response: MarvelResponse) => {
        return response.data.results.filter((result: Hero) => {
          return result.thumbnail && result.thumbnail.path !== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available';
        });
      })
    );
  }
}
