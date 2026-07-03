import { Component, inject, OnInit  } from '@angular/core';
import { LocationCard } from "../location-card/location-card";
import { LocationCardService } from "../services/location-card.service";
import { LocationCardDto } from '../models/location-card.dto';

@Component({
  selector: 'app-home',
  imports: [LocationCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  locationList: LocationCardDto[] = [];
  loading = true;
  error = '';
  private locationCardService = inject(LocationCardService);
  ngOnInit(): void {
    this.locationCardService.getAllLocations().subscribe({
      next: (data) => {
        this.locationList = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load locations';
        this.loading = false;
      },
    });
  }
}
