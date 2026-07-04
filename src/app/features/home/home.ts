import { Component, inject, OnInit, signal } from '@angular/core';

import { LocationCard } from '@core/models/location-card.model';
import { LocationCardService } from '@core/services/location-card.service';
import { LocationCardComponent } from '@shared/components/location-card/location-card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LocationCardComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomePage implements OnInit {
  private locationCardService = inject(LocationCardService);

  locationList = signal<LocationCard[]>([]);
  loading = signal(true);
  error = signal('');

  ngOnInit(): void {
    this.locationCardService.getAllLocations().subscribe({
      next: (data) => {
        this.locationList.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load locations');
        this.loading.set(false);
      },
    });
  }
}
