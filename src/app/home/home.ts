import { Component, inject } from '@angular/core';
import { LocationCard } from "../location-card/location-card";
import { LocationCardService } from "../services/location-card.service";
import { LocationCardDto } from '../models/location-card.dto';

@Component({
  selector: 'app-home',
  imports: [LocationCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  locationList: LocationCardDto[] = [];
  locationCardSercice: LocationCardService = inject(LocationCardService);
  constructor() {
    this.locationList = this.locationCardSercice.getAllLocations();
  }
}
