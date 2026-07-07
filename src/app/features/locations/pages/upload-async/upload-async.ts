import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { map, merge, startWith } from 'rxjs';

import { PhotoUploadResponse } from '@core/models/image-upload/upload.model';
import { LocationService } from '@core/services/location.service';
import { ImageUpload } from '@shared/components/image-upload/image-upload';

@Component({
  selector: 'app-upload-async',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ImageUpload],
  templateUrl: './upload-async.html',
  styleUrl: './upload-async.scss',
})
export class UploadAsyncPage {
  private fb = inject(FormBuilder);
  private locationService = inject(LocationService);
  private router = inject(Router);

  uploadedPhotoPath = signal<string | null>(null);
  saving = signal(false);
  saveError = signal<string | null>(null);

  locationForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    available_units: [1, [Validators.required, Validators.min(1)]],
    wifi: [false],
    laundry: [false],
  });

  private formValid = toSignal(
    merge(
      this.locationForm.statusChanges,
      this.locationForm.valueChanges
    ).pipe(
      startWith(null),
      map(() => this.locationForm.valid)
    ),
    { initialValue: this.locationForm.valid }
  );

  canSave = computed(
    () =>
      !!this.uploadedPhotoPath() &&
      this.formValid() &&
      !this.saving()
  );

  onPhotoUploaded(response: PhotoUploadResponse): void {
    this.uploadedPhotoPath.set(response.photo_path);
    this.saveError.set(null);
  }

  onPhotoUploadReset(): void {
    this.uploadedPhotoPath.set(null);
  }

  onSubmit(): void {
    const photoPath = this.uploadedPhotoPath();

    if (this.locationForm.invalid || !photoPath) {
      this.locationForm.markAllAsTouched();
      return;
    }

    const value = this.locationForm.getRawValue();
    this.saving.set(true);
    this.saveError.set(null);

    this.locationService
      .createLocation({
        ...value,
        photo_path: photoPath,
      })
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error(err);
          this.saving.set(false);
          this.saveError.set('خطا در ذخیره اطلاعات.');
        },
      });
  }
}
