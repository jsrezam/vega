import { Component, OnInit } from '@angular/core';
import { Auth0Service } from '../services/auth0.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileJson: string = null;
  constructor(public auth0Service: Auth0Service) { }

  ngOnInit(): void {
    this.auth0Service.auth0User$.subscribe((profile) => {
      // this.roles = profile['http://myapp.example.com/app_metadata']
      // console.log(this.roles)
      this.profileJson = JSON.stringify(profile, null, 2)
    });
  }

}
