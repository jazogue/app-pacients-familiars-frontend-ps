import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(public http: HttpClient) {}

  getPatientByAnyCriteria(value) {
    return this.http.get('http://localhost:8080/patient/any/' + value).pipe(
      catchError((error) => {
        if (error.status === 404 || error.status === 500) {
          return error;
        }
      })
    );
  }

  getAllStates(admissionId, idiom) {
    return this.http.get(
      'http://localhost:8080/states/admission/' +
        admissionId +
        '/idiom/' +
        idiom
    );
  }

  getAllGenStates() {
    return this.http.get('http://localhost:8080/states/generic/ca');
  }

  postGenericState(admissionId, stateId, locationId) {
    return this.http
      .post(
        'http://localhost:8080/state/generic/' +
          stateId +
          '/admission/' +
          admissionId,
        null
      )
      .toPromise();
  }

  postCustomState(admissionId, stateName, locationId) {
    return this.http
      .post(
        'http://localhost:8080/state/custom/admission/' + admissionId,
        JSON.parse(
          '{ "translatedText": "' +
            stateName +
            '", "stateType": "' +
            'personalitzat" ' +
            ', "location": "' +
            locationId +
            '" }'
        )
      )
      .toPromise();
  }

  modifyPatient(
    patientId,
    patientName,
    firstSurname,
    secondSurname,
    healthCardIdentifier
  ) {
    return this.http
      .post(
        'http://localhost:8080/patient/modify',
        JSON.parse(
          '{ "patientId": "' +
            patientId +
            '", "patientName": "' +
            patientName +
            '", "firstSurname": "' +
            firstSurname +
            '", "secondSurname": "' +
            secondSurname +
            '", "healthCardIdentifier": "' +
            healthCardIdentifier +
            '"  }'
        )
      )
      .toPromise();
  }

  postPatient(
    patientName,
    patientFirstSurname,
    patientSecondSurname,
    healthCardIdentifier
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
            '", "healthCardIdentifier": "' +
            healthCardIdentifier +
            '"  }'
        )
      )
      .pipe(
        catchError((error) => {
          if (error.status === 404 || error.status === 500) {
            return error;
          }
        })
      );
  }

  postAdmission(hospitalCareType, patientId) {
    return this.http
      .post(
        'http://localhost:8080/admission/patient/' + patientId,
        JSON.parse('{  "hospitalCareType": "' + hospitalCareType + '"  }')
      )
      .toPromise();
  }

  getAdmissionByPatientId(patientId) {
    return this.http
      .get('http://localhost:8080/admission/active/patient/' + patientId)
      .pipe(
        catchError((error) => {
          if (error.status === 404 || error.status === 500) {
            return error;
          }
        })
      );
  }

  modifyAdmission(patientId) {
    return this.http
      .post('http://localhost:8080/admission/type/patient/' + patientId, null)
      .toPromise();
  }

  getLocations() {
    return this.http.get('http://localhost:8080/locations');
  }
}
