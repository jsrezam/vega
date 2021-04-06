import { Auth0Service } from './auth0.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class Auth0Guard implements CanActivate {
    constructor(protected auth0Service: Auth0Service, protected router: Router) { }

    canActivate() {
        return this.auth0Service.isAuthenticated$.pipe(map(
            response => {
                if (response) return true
                this.router.navigate(['/']);
                return false;
            }));
    }
}