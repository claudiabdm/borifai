import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, scan, tap, switchMap } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyApiService {

  url = environment.spotifyApiUrl;
  currentArtistId: string = '3AA28KZvwAUcZuOKwyblJQ';
  currentArtist$: Observable<Object>;
  currentArtistAlbums$: Observable<Object>;
  currentArtistRelated$: Observable<Object>;
  currentArtistTracks$: Observable<Object>;


  constructor(
    private http: HttpClient
  ) { }

  getArtistInfo(id: string) {
    return this.http.get(`${this.url}${id}`);
  }

  getArtistAlbums(id: string) {
   return this.http.get(`${this.url}${id}/albums?include_groups=album&market=ES`)
      .pipe(
        map((res: any) => res.items
          .filter((item, idx: number) => {
            if (idx === res.items.length - 1) {
              return item.name !== res.items[idx - 1].name;
            }
            return item.name !== res.items[idx + 1].name;
          })
          .sort((a, b) => new Date(a.release_date) > new Date(b.release_date))
        )
      );
  }

  getArtistRelated(id: string) {
    return this.http.get(`${this.url}${id}/related-artists`).pipe(map((res: any) => res.artists));
  }

  getArtistTracks(id: string) {
    return this.http.get(`${this.url}${id}/top-tracks?country=ES`).pipe(map((res: any) => res.tracks));
  }

}
