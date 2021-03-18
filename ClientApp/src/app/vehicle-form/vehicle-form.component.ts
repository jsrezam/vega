import { VehicleService } from '../services/vehicle.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  makes: any[];
  models: any[];
  features: any[];
  vehicle: any = {
    features: [],
    isRegistered: false,
    contact: {}
  };
  constructor(
    private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.vehicleService.getMakes().subscribe((makes: any[]) =>
      this.makes = makes
    );

    this.vehicleService.getFeatures().subscribe((features: any[]) =>
      this.features = features);
  }

  onMakeChange() {
    // console.log("VEHICLE", this.vehicle);
    let selectedMake = this.makes.find(m => m.id == this.vehicle.makeId);
    // console.log("MODELS", selectedMake.models);
    this.models = selectedMake ? selectedMake.models : [];
    delete this.vehicle.modelId;
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
    // console.log(this.vehicle)
    this.vehicleService.create(this.vehicle)
      .subscribe(x => console.log(x));
  }
}
