import { AuthService } from '@auth0/auth0-angular';
import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class Auth0Service {
    private _auth0User$: Observable<any> = null;
    private _isAutenticated: boolean;
    private _userProfile: any;
    private userRoles: any;
    private readonly APP_METADATA = "http://myapp.example.com/app_metadata";

    constructor(
        private auth: AuthService,
        @Inject(DOCUMENT) private doc: Document) {
        this._auth0User$ = auth.user$;
        this.getAuthenticationState();
        this.getUserRoles();
    }

    private getAuthenticationState() {
        this.auth.isAuthenticated$
            .subscribe(authState => this._isAutenticated = authState);
    }

    private getUserRoles(): void {
        this.auth.user$.subscribe(profile => {
            if (this._isAutenticated) {
                this.userRoles = profile[this.APP_METADATA];
            }
        })
    }

    get auth0User$(): Observable<any> {
        return this._auth0User$;
    }

    get userProfile(): any {
        return this._userProfile
    }

    get isAutenticated(): boolean {
        return this._isAutenticated
    }

    isInRole(roleName: string): boolean {
        if (!this.userRoles)
            return false;

        return this.userRoles.roles.indexOf(roleName) > -1;
    }

    isInRole$(roleName: string): Observable<boolean> {
        console.log(this.auth0User$);
        if (this.auth0User$) {
            return this.auth0User$.pipe(
                take(1),
                map(profile => {
                    this.userRoles = profile[this.APP_METADATA];
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

    isLoading(): Observable<boolean> {
        return this.auth.isLoading$;
    }

    isAuthenticated() {
        return this.auth.isAuthenticated$;
    }
}