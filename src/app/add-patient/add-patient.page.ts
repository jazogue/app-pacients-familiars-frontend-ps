import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.page.html',
  styleUrls: ['./add-patient.page.scss'],
})
export class AddPatientPage implements OnInit {
  private patientName: string;
  private patientFirstSurname: string;
  private patientSecondSurname: string;
  private healthCardIdentifier: string;
  private healthCareType: string;
  private patientId = '';
  private showCreatedPatientId = false;
  private showCreatedAdmissionId = false;

  constructor(
    private api: ApiService,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {}

  createPatient() {
    if (
      this.patientName === '' ||
      this.patientName == null ||
      this.patientFirstSurname === '' ||
      this.patientFirstSurname == null ||
      this.healthCardIdentifier === '' ||
      this.healthCardIdentifier == null ||
      this.healthCareType === '' ||
      this.healthCareType == null
    ) {
      this.presentToastIncompleteForm();
    } else if (!this.healthCardNumberFormatCheck(this.healthCardIdentifier)) {
      this.presentToastHealthCardIdentifierFormat();
    } else {
      this.api
        .postPatient(
          this.patientName,
          this.patientFirstSurname,
          this.patientSecondSurname,
          this.healthCardIdentifier
        )
        .subscribe(
          (result: any) => {
            this.presentToastAddedPatient();
            this.patientId = result.id;
            this.showCreatedPatientId = true;
            this.api.postAdmission(this.healthCareType, this.patientId);
          },
          (err) => {
            this.api
              .getPatientByAnyCriteria(this.healthCardIdentifier)
              .subscribe((result2: any) => {
                this.api.getAdmissionByPatientId(result2.patientId).subscribe(
                  (result3: any) => {
                    this.presentToastNotAddedPatient();
                    this.showCreatedPatientId = false;
                    this.showCreatedAdmissionId = false;
                  },
                  (err2) => {
                    this.patientId = result2.patientId;
                    this.showCreatedAdmissionId = true;
                    this.api.postAdmission(this.healthCareType, this.patientId);
                    this.presentToastAddedAdmission();
                  }
                );
              });
          }
        );
    }
  }

  private healthCardNumberFormatCheck(cardNumber) {
    const regexp = new RegExp(
      '([A-Za-z]{4})+' + String.fromCharCode(92) + 'd{10}'
    );
    return regexp.test(cardNumber);
  }

  private async presentToastIncompleteForm() {
    const toast = await this.toastController.create({
      message: 'Falten camps per emplenar',
      duration: 2000,
      position: 'middle',
      color: 'secondary',
    });
    toast.present();
  }

  private async presentToastHealthCardIdentifierFormat() {
    const toast = await this.toastController.create({
      message: 'Introduïu un número targeta de sanitària correcte',
      duration: 2000,
      position: 'middle',
      color: 'secondary',
    });
    toast.present();
  }

  private async presentToastAddedPatient() {
    const toast = await this.toastController.create({
      message: 'Pacient afegit correctament',
      duration: 2000,
      position: 'middle',
      color: 'primary',
    });
    toast.present();
  }

  private async presentToastAddedAdmission() {
    const toast = await this.toastController.create({
      message: 'Creat nou seguiment per al pacient introduït',
      duration: 2000,
      position: 'middle',
      color: 'primary',
    });
    toast.present();
  }

  private async presentToastNotAddedPatient() {
    const toast = await this.toastController.create({
      message:
        'Pacient no afegit, número de targeta sanitaria ja existent i actiu. Abans has de cancel·lar el seguiment actiu d`aquest pacient.',
      duration: 4000,
      position: 'middle',
      color: 'secondary',
    });
    toast.present();
  }
}
