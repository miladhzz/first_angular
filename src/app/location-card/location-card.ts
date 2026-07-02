import { Component, input } from '@angular/core';
import { LocationCardDto as LocationCardDto } from '../models/location-card.dto';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-location-card',
  imports: [RouterLink],
  templateUrl: './location-card.html',
  styleUrl: './location-card.scss',
})
export class LocationCard {
  locationCard = input.required<LocationCardDto>();
}
