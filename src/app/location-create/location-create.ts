import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-location-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './location-create.html',
  styleUrl: './location-create.scss',
})
export class LocationCreate {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private router = inject(Router);

  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  locationForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    available_units: [
      1,
      [Validators.required, Validators.min(1)],
    ],
    wifi: [false],
    laundry: [false],
    photo: [null as File | null, Validators.required],
  });

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) {
      return;
    }

    const file = input.files[0];

    if (!file.type.startsWith('image/')) {
      alert('فقط فایل تصویری مجاز است.');
      input.value = '';
      return;
    }

    this.selectedFile = file;

    this.locationForm.patchValue({
      photo: file,
    });

    this.locationForm.get('photo')?.updateValueAndValidity();

    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = reader.result;
    };

    reader.readAsDataURL(file);
  }

  onSubmit(): void {
    if (this.locationForm.invalid || !this.selectedFile) {
      this.locationForm.markAllAsTouched();
      return;
    }

    const value = this.locationForm.getRawValue();

    const formData = new FormData();

    formData.append('name', value.name);
    formData.append('city', value.city);
    formData.append('state', value.state);
    formData.append(
      'available_units',
      value.available_units.toString()
    );
    formData.append('wifi', String(value.wifi));
    formData.append('laundry', String(value.laundry));
    formData.append('photo', this.selectedFile);

    this.http
      .post(`${environment.apiUrl}/api/locations`, formData)
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error(err);
          alert('خطا در ذخیره اطلاعات.');
        },
      });
  }
}