import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CookieService } from '../service/cookie.service';

@Injectable()
export class CookieInterceptor implements HttpInterceptor {
  constructor(private cookieService: CookieService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Attach cookies from service
    const modifiedReq = req.clone({
      setHeaders: {
        ...(this.cookieService.getCookies() ? { Cookie: this.cookieService.getCookies() } : {})
      }
    });

    return next.handle(modifiedReq).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          const cookies = event.headers.get('Set-Cookies');
          if (cookies) {
            this.cookieService.setCookies(cookies);
          }
        }
      })
    );
  }
}
