import { Component, inject } from '@angular/core';
import { LocationCard } from "../location-card/location-card";
import { LocationCardService } from "../services/location-card.service";
import { LocationCardDto } from '../models/location-card.dto';
import { About } from "../about/about";

@Component({
  selector: 'app-home',
  imports: [LocationCard, About],
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
