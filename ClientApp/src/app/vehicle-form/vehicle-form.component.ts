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
  vehicle: any = {};
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
    let selectedMake = this.makes.find(m => m.id == this.vehicle.make);
    // console.log("MODELS", selectedMake.models);
    this.models = selectedMake ? selectedMake.models : [];
  }
}
