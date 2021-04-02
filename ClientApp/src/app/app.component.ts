import { Auth0Service } from './services/auth0.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';
  constructor(public auth0Service: Auth0Service) { }
}
