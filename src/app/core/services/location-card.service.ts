import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { LocationCard } from '@core/models/locations/location-card.model';
import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class LocationCardService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/api/locations`;

  getAllLocations(): Observable<LocationCard[]> {
    return this.http.get<LocationCard[]>(this.apiUrl);
  }

  getLocationById(id: number): Observable<LocationCard> {
    return this.http.get<LocationCard>(`${this.apiUrl}/${id}`);
  }

  submitLocation(
    firstName: string,
    lastName: string,
    email: string
  ): Observable<void> {
    return this.http.post<void>(this.apiUrl, {
      firstName,
      lastName,
      email,
    });
  }
}
