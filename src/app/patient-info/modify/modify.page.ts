import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.page.html',
  styleUrls: ['./modify.page.scss'],
})
export class ModifyPage implements OnInit {
  patientName: string;
  patientId: string;
  firstSurname: string;
  secondSurname: string;
  healthCardIdentifier: string;
  hospitalCareType: string;
  constructor(
    public api: ApiService,
    public activatedRoute: ActivatedRoute,
    public toastController: ToastController
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.patientId = params.patientId;
      this.patientName = params.patientName;
      this.firstSurname = params.firstSurname;
      this.secondSurname = params.secondSurname;
      this.healthCardIdentifier = params.healthCardIdentifier;
      this.hospitalCareType = params.hospitalCareType;
    });
  }

  modifyPatient() {
    if (
      this.patientName === '' ||
      this.patientName == null ||
      this.firstSurname === '' ||
      this.firstSurname == null ||
      this.healthCardIdentifier === '' ||
      this.healthCardIdentifier == null ||
      this.hospitalCareType === '' ||
      this.hospitalCareType == null
    ) {
      this.presentToastIncompleteForm();
    } else if (this.healthCardIdentifier.length !== 14) {
      this.presentToastHealthCardIdentifier();
    } else {
      this.api.modifyPatient(
        this.patientId,
        this.patientName,
        this.firstSurname,
        this.secondSurname,
        this.healthCardIdentifier,
        this.hospitalCareType
      );
      this.presentToastModifiedPatient();
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
  private async presentToastHealthCardIdentifier() {
    const toast = await this.toastController.create({
      message:
        'El número de targeta sanitària és incorrecte, introduïu-lo novament',
      duration: 2000,
      position: 'middle',
    });
    toast.present();
  }
  private async presentToastModifiedPatient() {
    const toast = await this.toastController.create({
      message: 'Pacient modificat correctament',
      duration: 2000,
      position: 'middle',
    });
    toast.present();
  }
}
