import { AuthService } from '@auth0/auth0-angular';
import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment as env } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class Auth0Service {
    private _auth0User$: Observable<any> = null;
    private isAutenticated: boolean;
    private _userProfile: any;
    private userRoles: any;
    private readonly APP_ROLES = env.dev.rolesClaim;

    constructor(
        private auth: AuthService,
        @Inject(DOCUMENT) private doc: Document) {
        this._auth0User$ = auth.user$;
        this.getAuthenticationState();
        this.getUserRoles();
    }

    private getAuthenticationState() {
        this.auth.isAuthenticated$
            .subscribe(authState => this.isAutenticated = authState);
    }

    private getUserRoles(): void {
        this.auth.user$.subscribe(profile => {
            if (this.isAutenticated) {
                this.userRoles = profile[this.APP_ROLES];
            }
        })
    }

    get auth0User$(): Observable<any> {
        return this._auth0User$;
    }

    get userProfile(): any {
        return this._userProfile
    }

    get isAuthenticated$(): Observable<boolean> {
        return this.auth.isAuthenticated$;
    }

    get isLoading$(): Observable<boolean> {
        return this.auth.isLoading$;
    }

    isInRole(roleName: string): boolean {
        if (!this.userRoles)
            return false;

        return this.userRoles.indexOf(roleName) > -1;
    }

    isInRole$(roleName: string): Observable<boolean> {
        if (this.auth0User$) {
            return this.auth0User$.pipe(
                take(1),
                map(profile => {
                    this.userRoles = profile[this.APP_ROLES];
                    return this.isInRole(roleName);
                })
            );
        }
    }

    loginWithRedirect(): void {
        this.auth.loginWithRedirect();
    }

    logout(): void {
        this.auth.logout({
            returnTo: this.doc.location.origin
        });
    }
}