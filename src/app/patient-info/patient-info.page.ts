import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.page.html',
  styleUrls: ['./patient-info.page.scss'],
})
export class PatientInfoPage implements OnInit {
  private newStateType: string;
  private patientId: string;
  private patient: any;
  private genStates: any = [];
  private locations: any = [];
  private selectedState: any = null;
  private selectedLocation: any = null;
  private stateNameInput: string;
  private patientName: string;
  private firstSurname: string;
  private secondSurname: string;
  private healthCardIdentifier: string;
  private hospitalCareType: string;
  private admissionId: string;
  private showPatientInfo = false;

  constructor(
    private api: ApiService,
    private activatedRoute: ActivatedRoute,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private router: Router,
    private navCtrl: NavController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.patientId = params.patientId;
      this.patientName = params.patientName;
      this.firstSurname = params.firstSurname;
      this.secondSurname = params.secondSurname;
      this.healthCardIdentifier = params.healthCardIdentifier;
      this.hospitalCareType = params.hospitalCareType;
      this.admissionId = params.admissionId;
    });

    if (this.secondSurname === 'undefined') {
      this.secondSurname = '';
    }

    this.api.getAllGenStates().subscribe((result) => {
      this.genStates = result;
    });

    this.api.getLocations().subscribe((result) => {
      this.locations = result;
    });
  }

  goToModifyPatient() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        patientId: this.patientId,
        patientName: this.patientName,
        firstSurname: this.firstSurname,
        secondSurname: this.secondSurname,
        healthCardIdentifier: this.healthCardIdentifier,
        hospitalCareType: this.hospitalCareType,
        admissionId: this.admissionId,
      },
    };
    this.navCtrl.navigateForward(['patient-info/modify'], navigationExtras);
  }

  displayPatientInfo() {
    this.showPatientInfo = !this.showPatientInfo;
  }

  postGenericState() {
    if (this.selectedState == null) {
      this.presentToastErrorPostGenericState();
    } else {
      this.api.postGenericState(
        this.admissionId,
        this.selectedState.stateId,
        this.selectedLocation.locationId
      );
      this.presentStateSent();
    }
  }

  postCustomState() {
    if (this.stateNameInput == null || this.stateNameInput === '') {
      this.presentToastErrorPostCustomState();
    } else {
      this.api.postCustomState(
        this.admissionId,
        this.stateNameInput,
        this.selectedLocation.locationId
      );
      this.presentStateSent();
    }
  }

  directToStates() {
    this.router.navigate([
      'patient-info/states',
      {
        admissionId: this.admissionId,
      },
    ]);
  }

  finishTracking() {
    this.api.addFinishDate(this.admissionId);
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Eliminar seguiment',
      message:
        'Està segur de que vol eliminar el seguiment del pacient amb identificador <strong>' +
        this.patientId +
        '</strong>',
      buttons: [
        {
          text: 'Cancel·lar',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
        },
        {
          text: 'Confirmar',
          id: 'confirm-button',
          handler: () => {
            this.finishTracking();
            this.router.navigate([
              '../home',
              {
                admissionId: this.admissionId,
              },
            ]);
          },
        },
      ],
    });
    await alert.present();
  }

  private async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      message: 'Caragando...',
      spinner: 'bubbles',
    });
    return await loading.present();
  }

  private async presentToastErrorPostGenericState() {
    const toast = await this.toastController.create({
      message: 'No heu seleccionat cap estat',
      duration: 2000,
      position: 'middle',
      color: 'secondary',
    });
    toast.present();
  }

  private async presentToastErrorPostCustomState() {
    const toast = await this.toastController.create({
      message: 'No heu introduït cap estat',
      duration: 2000,
      position: 'middle',
      color: 'secondary',
    });
    toast.present();
  }

  private async presentStateSent() {
    const toast = await this.toastController.create({
      message: 'Nou estat enviat correctament',
      duration: 2000,
      position: 'middle',
      color: 'primary',
    });
    toast.present();
  }
}
