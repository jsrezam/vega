import { Auth0Service } from './../services/auth0.service';
import { PhotoService } from './../services/photo.service';
import { VehicleService } from './../services/vehicle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrls: ['./view-vehicle.component.css']
})
export class ViewVehicleComponent implements OnInit {
  @ViewChild("fileInput") fileInput: ElementRef;
  vehicle: any;
  vehicleId: number;
  photos: any[];
  progress: any;

  constructor(
    private auth0Service: Auth0Service,
    private route: ActivatedRoute,
    private router: Router,
    private toasty: ToastrService,
    private photoService: PhotoService,
    private vehicleService: VehicleService) {

    this.route.params.subscribe(p => {
      this.vehicleId = +p['id'];
      if (isNaN(this.vehicleId) || this.vehicleId <= 0) {
        router.navigate(['/vehicles']);
        return;
      }
    });
  }

  ngOnInit() {
    this.photoService.getPhotos(this.vehicleId)
      .subscribe((photos: any[]) => this.photos = photos);

    this.vehicleService.getVehicle(this.vehicleId)
      .subscribe(
        v => this.vehicle = v,
        err => {
          if (err.status == 404) {
            this.router.navigate(['/vehicles']);
            return;
          }
        });
  }

  delete() {
    if (confirm("Are you sure?")) {
      this.vehicleService.delete(this.vehicle.id)
        .subscribe(x => {
          this.router.navigate(['/vehicles']);
        });
    }
  }

  uploadPhoto() {
    // let nativeElement: HTMLInputElement = this.fileInput.nativeElement;
    // let file = nativeElement.files[0];
    // nativeElement.value = '';
    // this.photoService.upload(this.vehicleId, file)
    //   .subscribe(photo => {
    //     // console.log(photo.type);
    //     this.photos.push(photo);
    //   },
    //     err => {
    //       this.toasty.error(err.error, "Error", {
    //         onActivateTick: true
    //       });
    //     });
    let nativeElement: HTMLInputElement = this.fileInput.nativeElement;
    let file = nativeElement.files[0];
    nativeElement.value = '';
    this.photoService.upload(this.vehicleId, file)
      .subscribe(event => {
        console.log(event);
        if (event.type === HttpEventType.UploadProgress) {
          const percentDone = Math.round(100 * event.loaded / event.total);
          this.progress = percentDone;
        }
        if (event.type === HttpEventType.Response)
          this.photos.push(event.body);
      },
        err => {
          this.toasty.error(err.error, "Error", {
            onActivateTick: true
          })
        });

    this.progress = 0;
  }
}
