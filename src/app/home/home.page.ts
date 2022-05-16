import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { ToastController } from '@ionic/angular';

import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  patient: any = null;
  admission: any = null;
  searchInput: string;
  constructor(
    public api: ApiService,
    private router: Router,
    public toastController: ToastController,
    public navCtrl: NavController
  ) {}

  directToPatientInfo() {
    this.api.getPatientByAnyCriteria(this.searchInput).subscribe(
      (result2) => {
        this.patient = result2;
        this.api.getAdmissionByPatientId(this.patient.patientId).subscribe(
          (result: any) => {
            this.admission = result;
            const navigationExtras: NavigationExtras = {
              queryParams: {
                patientId: this.patient.patientId,
                patientName: this.patient.patientName,
                firstSurname: this.patient.firstSurname,
                secondSurname: this.patient.secondSurname,
                healthCardIdentifier: this.patient.healthCardIdentifier,
                admissionId: this.admission.admissionId,
                hospitalCareType: this.admission.hospitalCareType,
              },
            };
            this.navCtrl.navigateForward(['patient-info'], navigationExtras);
          },
          (err) => {
            this.presentToastErrorSearchAdmission();
          }
        );
      },
      (err) => {
        this.presentToastErrorSearchPatientId();
      }
    );
  }

  directToCreatePatient() {
    this.router.navigate(['/add-patient']);
  }

  private async presentToastErrorSearchPatientId() {
    const toast = await this.toastController.create({
      message: 'No s`ha trobat aquest pacient',
      duration: 2000,
      position: 'middle',
    });
    toast.present();
  }

  private async presentToastErrorSearchAdmission() {
    const toast = await this.toastController.create({
      message: 'No s`ha trobat cap admissió disponible amb aquest pacient',
      duration: 2000,
      position: 'middle',
    });
    toast.present();
  }
}
