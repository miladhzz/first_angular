import { Component, input } from '@angular/core';
import { LocationDto } from '../models/locaton.dto';

@Component({
  selector: 'app-location',
  imports: [],
  templateUrl: './location.html',
  styleUrl: './location.scss',
})
export class Location {
  location = input.required<LocationDto>();
}
