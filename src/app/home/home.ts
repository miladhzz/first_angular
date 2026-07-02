import { Component, inject } from '@angular/core';
import { LocationCard } from "../location-card/location-card";
import { LocationService } from "../services/location-card.service";
import { LocationDto } from '../models/location-card.dto';

@Component({
  selector: 'app-home',
  imports: [LocationCard],
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
