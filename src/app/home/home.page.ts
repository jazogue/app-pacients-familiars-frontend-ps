import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  patient: any;
  patientId: string;
  constructor(
    public api: ApiService,
    private router: Router,
    public toastController: ToastController
  ) {}

  directToPatientInfo() {
    this.api.getPatient(this.patientId).subscribe((result) => {
      this.patient = result;
    });
    setTimeout(() => {
      if (this.patient.patientId !== this.patientId) {
        this.presentToastErrorSearch();
      } else {
        this.router.navigate([
          '/patient-info',
          {
            patientId: this.patient.patientId,
          },
        ]);
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
