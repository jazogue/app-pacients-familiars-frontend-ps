import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

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

  getAllGenStates() {
    return this.http.get('http://localhost:8080/states/generic');
  }

  postGenericState(patientId, stateId) {
    return this.http
      .post(
        'http://localhost:8080/state/generic/' +
          stateId +
          '/patient/' +
          patientId,
        null
      )
      .toPromise();
  }

  postCustomState(patientId, stateName) {
    return this.http
      .post(
        'http://localhost:8080/state/custom/patient/' + patientId,
        JSON.parse(
          '{ "stateName": "' +
            stateName +
            '", "startTime": "' +
            '2022-05-08T08:04:33.000+00:00' +
            '", "stateType": "' +
            'personalitzat" }'
        )
      )
      .toPromise();
  }

  postPatient(
    patientName,
    patientFirstSurname,
    patientSecondSurname,
    healthCardIdentifier,
    healthCareType
  ) {
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
