import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { LocationCard } from '@core/models/location-card.model';

@Component({
  selector: 'app-location-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './location-card.html',
  styleUrl: './location-card.scss',
})
export class LocationCardComponent {
  locationCard = input.required<LocationCard>();
}
