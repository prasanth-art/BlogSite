import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlogService } from '../services/blog.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJwcmFjaHVAZXhhbXBsZS5jb20iLCJqdGkiOiJlMzNmMjQ3OC0yNjI2LTQ1YjctYmM1Yi1jYjRjNmIyZDFlODQiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjY2Zjk5MzIzMjM0OTYzODY3MDA1OTgzYSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJwcmFjaHUiLCJleHAiOjE3Mjg0NzE1ODMsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjcyMjYiLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo3MjI2In0.St-P8uuQsC1SVRkjOeEmcL-o-Oia107TkU5xk8Iy2p8';
    
    if (token) {
      const authReq = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      return next.handle(authReq);
    }

    return next.handle(request);
  }
}
