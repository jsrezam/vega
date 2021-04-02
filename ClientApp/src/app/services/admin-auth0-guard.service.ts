import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Auth0Service } from './auth0.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class AdminAuth0Guard implements CanActivate {
    constructor(private auth0Service: Auth0Service, private router: Router) { }

    canActivate(): Observable<boolean> {
        return this.auth0Service.isInRole$('Admin').pipe(map(res => {
            if (res) return true;
            this.router.navigate(['/non-authorized']);
            return false;
        }));
    }
}