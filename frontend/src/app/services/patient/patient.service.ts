import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface PatientResponse {
  patients: PatientData[]
};

export interface PatientData {
  id: number,
  name: string,
  age: number,
  cpf: string,
  rg: string,
  date_of_birth: Date,
  gender: string,
  sign: string,
  mother: string,
  father: string,
  email: string,
  password: string,
  cep: string,
  address: string,
  number: number,
  neighborhood: string,
  city: string,
  state: string,
  landline: string,
  phone_number: string,
  height: number,
  weight: number,
  blood_type: string,
  color: string
};

@Injectable({
  providedIn: 'root'
})

export class PatientService {
  public patients: PatientData[] = [];

  constructor( private http: HttpClient ) {
  }

  getAllPatients(): Observable<PatientResponse> {
    const baseUrl = environment.baseUrl;
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });

    return this.http.get<PatientResponse>(`${baseUrl}/patients`, { headers });
  }
}
