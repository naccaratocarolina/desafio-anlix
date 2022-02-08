import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface CharacteristicResponse {
  characteristics: CharacteristicData[]
};

export interface IndexResponse {
  ind_card: CharacteristicData[],
  ind_pulm: CharacteristicData[]
};

export interface CharacteristicData {
  type: string,
  epoch: string,
  index: number
};

@Injectable({
  providedIn: 'root'
})
export class CharacteristicService {
  public characteristics: CharacteristicData[] = [];

  constructor( private http: HttpClient ) { }

  getAllCharacteristics (): Observable<CharacteristicResponse> {
    const baseUrl = environment.baseUrl;
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });

    return this.http.get<CharacteristicResponse>(`${baseUrl}/characteristics/`, { headers });
  }

  getAllPatientsCharacteristics (patientId: string): Observable<IndexResponse> {
    const baseUrl = environment.baseUrl;
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });

    return this.http.get<IndexResponse>(`${baseUrl}/characteristics/patients/${patientId}`, { headers });
  }

  getPacientCharacteristic (patientId: string): Observable<IndexResponse> {
    const baseUrl = environment.baseUrl;
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });

    return this.http.get<IndexResponse>(`${baseUrl}/characteristics/patients/indexes/${patientId}`, { headers });
  }
}
