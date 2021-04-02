import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PhotoService {
    constructor(private http: HttpClient) { }

    upload(vehicleId, photo) {

        let formData = new FormData();
        formData.append('file', photo);

        // return this.http.post(`/api/vehicles/${vehicleId}/photos`, formData).pipe(
        //     map(res => res)
        // );

        return this.http.post(`/api/vehicles/${vehicleId}/photos`, formData, {
            observe: 'events',
            reportProgress: true
        }).pipe(
            map(res => res)
        );
    }

    getPhotos(vehicleId) {
        return this.http.get(`/api/vehicles/${vehicleId}/photos`).pipe(
            map(res => res)
        );
    }
}