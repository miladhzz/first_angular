import { Component, inject, output, signal } from '@angular/core';
import { filter, Subscription } from 'rxjs';
import { LocationService } from '../../services/location.service';
import { PhotoUploadResponse } from '../../models/photo-upload-response.dto';
import {
  UploadProgress,
  UploadProgressStatus,
} from '../upload-progress/upload-progress';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [UploadProgress],
  templateUrl: './image-upload.html',
  styleUrl: './image-upload.scss',
})
export class ImageUpload {
  private locationService = inject(LocationService);
  private uploadSubscription: Subscription | null = null;

  photoUploaded = output<PhotoUploadResponse>();
  uploadReset = output<void>();

  previewUrl = signal<string | null>(null);
  uploadProgress = signal(0);
  uploadStatus = signal<UploadProgressStatus>('idle');
  uploadError = signal<string | null>(null);

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      this.uploadStatus.set('error');
      this.uploadError.set('فقط فایل تصویری مجاز است.');
      input.value = '';
      return;
    }

    this.resetUploadState();
    this.readPreview(file);
    this.startUpload(file);
  }

  reset(): void {
    this.uploadSubscription?.unsubscribe();
    this.uploadSubscription = null;
    this.previewUrl.set(null);
    this.uploadProgress.set(0);
    this.uploadStatus.set('idle');
    this.uploadError.set(null);
    this.uploadReset.emit();
  }

  private resetUploadState(): void {
    this.uploadSubscription?.unsubscribe();
    this.uploadProgress.set(0);
    this.uploadStatus.set('uploading');
    this.uploadError.set(null);
  }

  private readPreview(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl.set(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  private startUpload(file: File): void {
    this.uploadSubscription = this.locationService
      .uploadPhoto(file)
      .pipe(filter((update) => update !== null))
      .subscribe({
        next: (update) => {
          if (update.kind === 'progress') {
            this.uploadProgress.set(update.progress);
            return;
          }

          this.uploadProgress.set(100);
          this.uploadStatus.set('success');
          this.photoUploaded.emit(update.response);
        },
        error: () => {
          this.uploadStatus.set('error');
          this.uploadError.set('خطا در آپلود عکس. دوباره تلاش کنید.');
        },
      });
  }
}
