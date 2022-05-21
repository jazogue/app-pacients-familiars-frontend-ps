import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { ToastController } from '@ionic/angular';

import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private patient: any = null;
  private admission: any = null;
  private searchInput: string;
  constructor(
    private api: ApiService,
    private router: Router,
    private toastController: ToastController,
    private navCtrl: NavController,
    private loadingController: LoadingController
  ) {}

  directToPatientInfo() {
    if (this.searchInput === '' || this.searchInput == null) {
      this.presentToastErrorNoSearchInput();
    } else {
      this.presentLoading();
      this.api
        .getPatientByAnyCriteria(this.searchInput.toLowerCase())
        .subscribe(
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
                this.navCtrl.navigateForward(
                  ['patient-info'],
                  navigationExtras
                );
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
  }

  directToCreatePatient() {
    this.router.navigate(['/add-patient']);
  }

  private async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cercant el pacient...',
      duration: 1000,
    });
    await loading.present();
  }

  private async presentToastErrorNoSearchInput() {
    const toast = await this.toastController.create({
      message: 'Introdueix un codi de pacient o número de targeta sanitària',
      duration: 2000,
      position: 'middle',
      color: 'secondary',
    });
    toast.present();
  }

  private async presentToastErrorSearchPatientId() {
    const toast = await this.toastController.create({
      message: 'No s`ha trobat aquest pacient',
      duration: 2000,
      position: 'middle',
      color: 'secondary',
    });
    toast.present();
  }

  private async presentToastErrorSearchAdmission() {
    const toast = await this.toastController.create({
      message: 'No s`ha trobat cap admissió disponible amb aquest pacient',
      duration: 2000,
      position: 'middle',
      color: 'secondary',
    });
    toast.present();
  }
}
