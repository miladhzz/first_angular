import {
  HttpClient,
  HttpEvent,
  HttpEventType,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { filter, map, Observable } from 'rxjs';

import { environment } from '@env/environment';
import {
  PhotoUploadResponse,
  PhotoUploadUpdate,
  UploadCompleteUpdate,
  UploadProgressUpdate,
} from '@core/models/image-upload/upload.model';

@Injectable({ providedIn: 'root' })
export class UploadService {
  private http = inject(HttpClient);
  private uploadApiUrl = `${environment.apiUrl}/api/uploads/photo`;

  uploadPhoto(file: File): Observable<PhotoUploadUpdate> {
    const formData = new FormData();
    formData.append('photo', file);

    return this.http
      .post<PhotoUploadResponse>(this.uploadApiUrl, formData, {
        reportProgress: true,
        observe: 'events',
      })
      .pipe(
        map((event: HttpEvent<PhotoUploadResponse>) => {
          if (event.type === HttpEventType.UploadProgress) {
            const total = event.total ?? event.loaded;

            return {
              kind: 'progress',
              progress: Math.round((event.loaded / total) * 100),
            } as UploadProgressUpdate;
          }

          if (
            event.type === HttpEventType.Response &&
            event.body
          ) {
            return {
              kind: 'complete',
              response: event.body,
            } as UploadCompleteUpdate;
          }

          return null;
        }),
        filter(
          (update): update is PhotoUploadUpdate => update !== null
        ),
      );
  }
}
