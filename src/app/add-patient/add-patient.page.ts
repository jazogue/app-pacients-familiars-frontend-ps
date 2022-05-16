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
  patientId = '';
  showCreatedPatientId = false;
  showCreatedAdmissionId = false;
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
      this.healthCardIdentifier === '' ||
      this.healthCardIdentifier == null ||
      this.healthCareType === '' ||
      this.healthCareType == null
    ) {
      this.presentToastIncompleteForm();
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

  private async presentToastIncompleteForm() {
    const toast = await this.toastController.create({
      message: 'Falten camps per emplenar',
      duration: 2000,
      position: 'middle',
    });
    toast.present();
  }

  private async presentToastAddedPatient() {
    const toast = await this.toastController.create({
      message: 'Pacient afegit correctament',
      duration: 2000,
      position: 'middle',
    });
    toast.present();
  }

  private async presentToastAddedAdmission() {
    const toast = await this.toastController.create({
      message: 'Creat nou seguiment per al pacient introduït',
      duration: 2000,
      position: 'middle',
    });
    toast.present();
  }

  private async presentToastNotAddedPatient() {
    const toast = await this.toastController.create({
      message:
        'Pacient no afegit, número de targeta sanitaria ja existent i actiu. Abans has de cancel·lar el seguiment actiu d`aquest pacient.',
      duration: 4000,
      position: 'middle',
    });
    toast.present();
  }
}
