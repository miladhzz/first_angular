import { Component, inject, OnInit } from '@angular/core';
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
export class Details implements OnInit {

  route: ActivatedRoute = inject(ActivatedRoute);
  locationCardService = inject(LocationCardService);
  locationCard: LocationCardDto | undefined;
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
        this.applyForm.value.email ?? '',
      )
      .subscribe({
        next: () => alert('Application submitted'),
        error: () => alert('Submission failed'),
      });
  }

}
