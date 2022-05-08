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
  searchInput: string;
  constructor(
    public api: ApiService,
    private router: Router,
    public toastController: ToastController,
    public navCtrl: NavController
  ) {}

  directToPatientInfo() {
    this.api.getPatientByAnyCriteria(this.searchInput).subscribe((result) => {
      this.patient = result;
    });

    setTimeout(() => {
      if (this.patient == null) {
        this.presentToastErrorSearch();
      } else {
        const navigationExtras: NavigationExtras = {
          queryParams: {
            patientId: this.patient.patientId,
            patientName: this.patient.patientName,
            firstSurname: this.patient.firstSurname,
            secondSurname: this.patient.secondSurname,
            healthCardIdentifier: this.patient.healthCardIdentifier,
            hospitalCareType: this.patient.hospitalCareType,
          },
        };
        this.navCtrl.navigateForward(['patient-info'], navigationExtras);
      }
    }, 2000);
  }

  directToCreatePatient() {
    this.router.navigate(['/add-patient']);
  }

  private async presentToastErrorSearch() {
    const toast = await this.toastController.create({
      message: 'No s`ha trobat aquest pacient',
      duration: 2000,
      position: 'middle',
    });
    toast.present();
  }
}
