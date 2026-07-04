import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { LocationCard } from '@core/models/location-card.model';
import { LocationCardService } from '@core/services/location-card.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './details.html',
  styleUrl: './details.scss',
})
export class DetailsPage implements OnInit {
  route = inject(ActivatedRoute);
  locationCardService = inject(LocationCardService);

  locationCard: LocationCard | undefined;
  error = '';

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });

  ngOnInit(): void {
    const id = Number(this.route.snapshot.params['id']);
    this.locationCardService.getLocationById(id).subscribe({
      next: (data) => (this.locationCard = data),
      error: () => (this.error = 'Location not found'),
    });
  }

  submitApplication(): void {
    this.locationCardService
      .submitLocation(
        this.applyForm.value.firstName ?? '',
        this.applyForm.value.lastName ?? '',
        this.applyForm.value.email ?? ''
      )
      .subscribe({
        next: () => alert('Application submitted'),
        error: () => alert('Submission failed'),
      });
  }
}
