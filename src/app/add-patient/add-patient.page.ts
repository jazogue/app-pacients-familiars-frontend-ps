import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.page.html',
  styleUrls: ['./add-patient.page.scss'],
})
export class AddPatientPage implements OnInit {
  patientName: string;
  patientFirstSurname: string;
  patientSecondSurname: string;
  healthCardIdentifier: string;
  healthCareType: string;
  public response: any;

  constructor(
    public api: ApiService,
    public toastController: ToastController
  ) {}

  ngOnInit() {}

  createPatient() {
    if (
      this.patientName === '' ||
      this.patientName == null ||
      this.patientFirstSurname === '' ||
      this.patientFirstSurname == null ||
      this.patientSecondSurname === '' ||
      this.patientSecondSurname == null ||
      this.healthCardIdentifier === '' ||
      this.healthCardIdentifier == null ||
      this.healthCareType === '' ||
      this.healthCareType == null
    ) {
      console.log('entro en iff');
      this.presentToastSearchIdError();
    } else {
      console.log('entro en elseee');
      this.api.postPatient(
        this.patientName,
        this.patientFirstSurname,
        this.patientSecondSurname,
        this.healthCardIdentifier,
        this.healthCareType
      );
      console.log('despueeeews');
    }
  }

  private async presentToastSearchIdError() {
    const toast = await this.toastController.create({
      message: 'Faltan campos por rellenar',
      duration: 2000,
      position: 'middle',
    });
    toast.present();
  }
}
