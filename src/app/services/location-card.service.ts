import { Injectable, inject } from '@angular/core';
import { LocationCardDto } from '../models/location-card.dto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../envirenments/envirenment';

@Injectable({ providedIn: 'root' })
export class LocationCardService {
  private http = inject(HttpClient);
  private baseApiUrl = environment.apiUrl;
  private apiUrl = `${this.baseApiUrl}/api/locations`;

  getAllLocations(): Observable<LocationCardDto[]> {
    return this.http.get<LocationCardDto[]>(this.apiUrl);
  }
  getLocationById(id: number): Observable<LocationCardDto> {
    return this.http.get<LocationCardDto>(`${this.apiUrl}/${id}`);
  }
  submitLocation(firstName: string, lastName: string, email: string): Observable<void> {
    return this.http.post<void>(this.apiUrl, {
      firstName,
      lastName,
      email,
    });
  }

}
