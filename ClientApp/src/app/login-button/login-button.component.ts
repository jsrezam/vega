import { Auth0Service } from '../services/auth0.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.css']
})
export class LoginButtonComponent implements OnInit {

  constructor(public auth0Service: Auth0Service) { }

  ngOnInit(): void {
  }

  loginWithRedirect(): void {
    this.auth0Service.loginWithRedirect();
  }

}
