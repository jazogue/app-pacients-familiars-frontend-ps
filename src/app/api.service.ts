import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(public http: HttpClient) {}

  getPatient(patientId) {
    return this.http.get('http://localhost:8080/patient/' + patientId).pipe(
      catchError((error) => {
        if (error.status === 404) {
          return [];
        }
      })
    );
  }

  getAllStates(patientId) {
    return this.http.get('http://localhost:8080/states/patient/' + patientId);
  }

  postPatient(
    patientName,
    patientFirstSurname,
    patientSecondSurname,
    healthCardIdentifier,
    healthCareType
  ) {
    console.log(
      patientName +
        ' ' +
        patientFirstSurname +
        ' ' +
        patientSecondSurname +
        ' ' +
        healthCardIdentifier +
        ' ' +
        healthCareType
    );
    return this.http
      .post(
        'http://localhost:8080/patient',
        JSON.parse(
          '{ "patientName": "' +
            patientName +
            '", "firstSurname": "' +
            patientFirstSurname +
            '", "secondSurname": "' +
            patientSecondSurname +
            '", "hospitalCareType": "' +
            healthCareType +
            '", "healthCardIdentifier": "' +
            healthCardIdentifier +
            '"  }'
        )
      )
      .toPromise();
  }
}
