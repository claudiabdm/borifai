import { Injectable, Inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SpotifyApiService } from '../services/spotify-api.service';
import { tap } from 'rxjs/internal/operators/tap';
import { catchError, switchMap, flatMap, map, retry } from 'rxjs/operators';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable()
export class SpotifyApiInterceptor implements HttpInterceptor {

  constructor(
    private spotifyApi: SpotifyApiService,
    private http: HttpClient,
    @Inject(LOCAL_STORAGE) private storage: StorageService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = 'Bearer BQBgw2RhvwBFS-Wd5S2ld1oFUtBbjM9uyzonDdoxiqv698DKrMkEDDgQ-JKnevvbTic5EecO_cRBfsGWeh0';
    return next.handle(this.addToken(request, token))
  }

  private addToken(request: HttpRequest<unknown>, token: string) {
    return request.clone({ setHeaders: { Authorization: token } });
  }

}
