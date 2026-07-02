import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocationCardService } from '../services/location-card.service';
import { LocationCardDto } from '../models/location-card.dto';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  imports: [ReactiveFormsModule],
  templateUrl: './details.html',
  styleUrl: './details.scss',
})
export class Details {

  route: ActivatedRoute = inject(ActivatedRoute);
  locationCardService = inject(LocationCardService);
  locationCard: LocationCardDto | undefined;

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });

  constructor() {
    const locationcardId = Number(this.route.snapshot.params['id']);
    this.locationCard = this.locationCardService.getLocationById(locationcardId);
  }

  submitApplication() {
    this.locationCardService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? '',
    );
  }

}
