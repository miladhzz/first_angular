import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocationCardService } from '../services/location-card.service';
import { LocationCardDto } from '../models/location-card.dto';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.html',
  styleUrl: './details.scss',
})
export class Details {

  route: ActivatedRoute = inject(ActivatedRoute);
  locationCardService = inject(LocationCardService);
  locationCard: LocationCardDto | undefined;

  constructor() {
    const locationcardId = Number(this.route.snapshot.params['id']);
    this.locationCard = this.locationCardService.getLocationById(locationcardId);
  }

}
