import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { LocationCreatePayload } from '../models/location-create.dto';
import { PhotoUploadResponse } from '../models/photo-upload-response.dto';

export interface UploadProgressUpdate {
  kind: 'progress';
  progress: number;
}

export interface UploadCompleteUpdate {
  kind: 'complete';
  response: PhotoUploadResponse;
}

export type PhotoUploadUpdate = UploadProgressUpdate | UploadCompleteUpdate;

@Injectable({ providedIn: 'root' })
export class LocationService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/api/locations`;

  uploadPhoto(file: File): Observable<PhotoUploadUpdate> {
    const formData = new FormData();
    formData.append('photo', file);

    return this.http
      .post<PhotoUploadResponse>(`${this.apiUrl}/upload-photo`, formData, {
        reportProgress: true,
        observe: 'events',
      })
      .pipe(
        map((event: HttpEvent<PhotoUploadResponse>): PhotoUploadUpdate | null => {
          if (event.type === HttpEventType.UploadProgress) {
            const total = event.total ?? event.loaded;
            const progress = total ? Math.round((100 * event.loaded) / total) : 0;
            return { kind: 'progress', progress };
          }

          if (event.type === HttpEventType.Response && event.body) {
            return { kind: 'complete', response: event.body };
          }

          return null;
        }),
        filter((update): update is PhotoUploadUpdate => update !== null),
      );
  }

  createLocation(payload: LocationCreatePayload): Observable<void> {
    const formData = new FormData();
    formData.append('name', payload.name);
    formData.append('city', payload.city);
    formData.append('state', payload.state);
    formData.append('available_units', payload.available_units.toString());
    formData.append('wifi', String(payload.wifi));
    formData.append('laundry', String(payload.laundry));
    formData.append('photo_path', payload.photo_path);

    return this.http.post<void>(this.apiUrl, formData);
  }
}
