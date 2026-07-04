import { Component, input } from '@angular/core';

export type UploadProgressStatus = 'idle' | 'uploading' | 'success' | 'error';

@Component({
  selector: 'app-upload-progress',
  standalone: true,
  templateUrl: './upload-progress.html',
  styleUrl: './upload-progress.scss',
})
export class UploadProgress {
  progress = input(0);
  status = input<UploadProgressStatus>('idle');
  errorMessage = input<string | null>(null);
}
