import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { from, Observable, switchMap } from 'rxjs';
import { StorageKeys } from '../interfaz/storage';
import { StorageService } from '../servicio/storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private storageService = inject(StorageService);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Convertimos la Promise a Observable y usamos switchMap
    return from(this.storageService.get(StorageKeys.TOKEN)).pipe(
      switchMap(token => {
        if (token) {
          const authRequest = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });
          return next.handle(authRequest);
        }
        return next.handle(request);
      })
    );
  }
}
