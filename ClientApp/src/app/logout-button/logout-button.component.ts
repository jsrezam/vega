import { Auth0Service } from './../services/auth0.service';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.css']
})
export class LogoutButtonComponent implements OnInit {

  constructor(public auth0Service: Auth0Service) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.auth0Service.logout();
  }

}
