import { Component, inject } from '@angular/core';
import { Location } from "../location/location";
import { LocationService } from "../services/location.service";
import { LocationDto } from '../models/locaton.dto';

@Component({
  selector: 'app-home',
  imports: [Location],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  locationList: LocationDto[] = [];
  locationSercice: LocationService = inject(LocationService);
  constructor() {
    this.locationList = this.locationSercice.getAllHousingLocations();
  }
}
