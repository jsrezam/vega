import { FeatureService } from './../services/feature.service';
import { MakeService } from './../services/make.service';
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
    private makeService: MakeService,
    private featureService: FeatureService) { }

  ngOnInit(): void {
    this.makeService.getMakes().subscribe((makes: any[]) =>
      this.makes = makes
    );

    this.featureService.getFeatures().subscribe((features: any[]) =>
      this.features = features);
  }

  onMakeChange() {
    // console.log("VEHICLE", this.vehicle);
    let selectedMake = this.makes.find(m => m.id == this.vehicle.make);
    // console.log("MODELS", selectedMake.models);
    this.models = selectedMake ? selectedMake.models : [];
  }
}
