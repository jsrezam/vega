import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { SaveVehicle } from '../models/vehicle';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private readonly vehiclesEndpoint = '/api/vehicles/';
  constructor(private http: HttpClient) { }

  getMakes() {
    return this.http.get(`${env.dev.apiUrl}/api/makes`).pipe(
      map(res => res)
    );
  }

  getFeatures() {
    return this.http.get('/api/features').pipe(
      map(res => res)
    );
  }

  create(vehicle) {
    return this.http.post(env.dev.apiUrl + this.vehiclesEndpoint, vehicle).pipe(
      map(res => res)
    );
  }

  getVehicle(id) {
    return this.http.get(this.vehiclesEndpoint + id).pipe(
      map(res => res)
    );
  }

  update(vehicle: SaveVehicle) {
    return this.http.put(env.dev.apiUrl + this.vehiclesEndpoint + vehicle.id, vehicle).pipe(
      map(res => res)
    );
  }

  delete(id) {
    return this.http.delete(env.dev.apiUrl + this.vehiclesEndpoint + id).pipe(
      map(res => res)
    );
  }

  getVehicles(filter) {
    return this.http.get(this.vehiclesEndpoint + '?' + this.toQueryString(filter)).pipe(
      map(res => res)
    );
  }

  toQueryString(obj) {
    let parts = [];
    for (let property in obj) {
      let value = obj[property];
      if (value != null && value != undefined)
        parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value));

    }

    return parts.join('&');

  }
}
