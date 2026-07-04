import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { LocationCreatePayload } from '@core/models/location-create.model';
import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class LocationService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/api/locations`;

  createLocation(payload: LocationCreatePayload): Observable<void> {
    const formData = new FormData();

    formData.append('name', payload.name);
    formData.append('city', payload.city);
    formData.append('state', payload.state);
    formData.append(
      'available_units',
      payload.available_units.toString()
    );
    formData.append('wifi', String(payload.wifi));
    formData.append('laundry', String(payload.laundry));
    formData.append('photo_path', payload.photo_path);

    return this.http.post<void>(this.apiUrl, formData);
  }
}
