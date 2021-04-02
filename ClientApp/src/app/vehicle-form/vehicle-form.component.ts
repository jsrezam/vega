import * as _ from 'underscore'
import { SaveVehicle } from './../models/vehicle';
import { VehicleService } from '../services/vehicle.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Vehicle } from '../models/vehicle';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  makes: any[];
  models: any[];
  features: any[];
  vehicle: SaveVehicle = {
    id: 0,
    makeId: 0,
    modelId: 0,
    features: [],
    isRegistered: false,
    contact: {
      name: '',
      phone: '',
      email: ''
    }
  };
  constructor(
    private route: ActivatedRoute, //Read routes parameters
    private router: Router,
    private vehicleService: VehicleService,
    private toastyService: ToastrService) {

    route.params.subscribe(p => {
      this.vehicle.id = +p['id'] || 0;
    });
  }

  ngOnInit(): void {

    var sources = [
      this.vehicleService.getMakes(),
      this.vehicleService.getFeatures()
    ];

    if (this.vehicle.id)
      sources.push(this.vehicleService.getVehicle(this.vehicle.id))

    forkJoin(sources)
      .subscribe((data: any) => {
        this.makes = data[0];
        this.features = data[1];
        if (this.vehicle.id) {
          this.setVehicle(data[2]);
          this.populateModels();
        }
      }, err => {
        if (err.status == 404)
          this.router.navigate(['/']);
      });
  }

  private setVehicle(v: Vehicle) {
    this.vehicle.id = v.id;
    this.vehicle.makeId = v.make.id;
    this.vehicle.modelId = v.model.id;
    this.vehicle.isRegistered = v.isRegistered;
    this.vehicle.contact = v.contact;
    this.vehicle.features = _.pluck(v.features, 'id');
  }

  onMakeChange() {
    this.populateModels();
    delete this.vehicle.modelId;
  }

  private populateModels() {
    // console.log("VEHICLE", this.vehicle);
    let selectedMake = this.makes.find(m => m.id == this.vehicle.makeId);
    // console.log("MODELS", selectedMake.models);
    this.models = selectedMake ? selectedMake.models : [];
  }

  onFeatureToggle(featureId, $event) {

    if ($event.target.checked)
      this.vehicle.features.push(featureId);
    else {
      let index = this.vehicle.features.indexOf(featureId);
      this.vehicle.features.splice(index, 1);
    }

  }

  submit() {
    // this.vehicleService.create(this.vehicle)
    //   .subscribe(
    //     x => console.log(x));
    var result$ = (this.vehicle.id) ? this.vehicleService.update(this.vehicle) : this.vehicleService.create(this.vehicle);
    result$.subscribe((vehicle: any) => {
      this.toastyService.success("Data was sucessfully saved.", "Success", {
        onActivateTick: true
      })
      this.router.navigate(['/vehicles/', vehicle.id])
    });
  }

}
