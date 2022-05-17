import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from '../../api.service';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { LoadingController } from '@ionic/angular';

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
  initialHospitalCareType: string;
  hospitalCareType: string;
  admissionId: string;
  savedNewInfo = false;

  constructor(
    public api: ApiService,
    public activatedRoute: ActivatedRoute,
    public toastController: ToastController,
    public navCtrl: NavController,
    public loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.patientId = params.patientId;
      this.patientName = params.patientName;
      this.firstSurname = params.firstSurname;
      this.secondSurname = params.secondSurname;
      this.healthCardIdentifier = params.healthCardIdentifier;
      this.initialHospitalCareType = params.hospitalCareType;
      this.admissionId = params.admissionId;
    });
    this.hospitalCareType = this.initialHospitalCareType;
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
      this.presentLoading();
      this.api.modifyPatient(
        this.patientId,
        this.patientName,
        this.firstSurname,
        this.secondSurname,
        this.healthCardIdentifier
      );
      console.log(this.patientId);
      if (this.hospitalCareType !== this.initialHospitalCareType) {
        this.api.modifyAdmission(this.patientId);
        this.initialHospitalCareType = this.hospitalCareType;
      }
      this.savedNewInfo = true;
      setTimeout(() => {
        this.presentToastModifiedPatient();
      }, 2000);
    }
  }

  goBackWithParams() {
    if (this.savedNewInfo) {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          patientId: this.patientId,
          patientName: this.patientName,
          firstSurname: this.firstSurname,
          secondSurname: this.secondSurname,
          healthCardIdentifier: this.healthCardIdentifier,
          admissionId: this.admissionId,
          hospitalCareType: this.hospitalCareType,
        },
      };
      this.navCtrl.navigateBack(['patient-info'], navigationExtras);
    } else {
      window.history.go(-1);
    }
  }

  private async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Modificant dades del pacient...',
      duration: 1000,
    });
    await loading.present();
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
