import { Component, inject, OnInit, signal } from '@angular/core';
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
  locationList = signal<LocationCardDto[]>([]);
  loading = signal(true);
  error = signal('');
  private locationCardService = inject(LocationCardService);
  ngOnInit(): void {
    this.locationCardService.getAllLocations().subscribe({
      next: (data) => {
        this.locationList.set(data);
        this.loading.set(false);
        console.log("haaaaaaaaa");
      },
      error: () => {
        this.error.set('Failed to load locations');
        this.loading.set(false);
        console.log("eeeeeeeeeeeee");
      },
    });
  }
}
