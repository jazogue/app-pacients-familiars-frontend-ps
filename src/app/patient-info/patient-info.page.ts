import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.page.html',
  styleUrls: ['./patient-info.page.scss'],
})
export class PatientInfoPage implements OnInit {
  newStateType: string;
  patientId: string;
  patient: any;
  genStates: any = [];
  selectedState: any = null;
  stateNameInput: string;

  constructor(
    public api: ApiService,
    public activatedRoute: ActivatedRoute,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    this.patientId = this.activatedRoute.snapshot.paramMap.get('patientId');

    this.api.getAllGenStates().subscribe((result) => {
      this.genStates = result;
    });

    /*
    this.api.getPatient(this.patientId).subscribe((result) => {
      this.patient = result;
      console.log(this.patient.patientName);
    });
    -*/

    //console.log(this.patient.patientId);
  }

  postGenericState() {
    if (this.selectedState == null) {
      this.presentToastErrorPostGenericState();
    } else {
      this.api.postGenericState(this.patientId, this.selectedState.stateId);
      this.presentStateSent();
    }
  }

  postCustomState() {
    if (this.stateNameInput == null || this.stateNameInput === '') {
      this.presentToastErrorPostCustomState();
    } else {
      this.api.postCustomState(this.patientId, this.stateNameInput);
      this.presentStateSent();
    }
  }

  directToStates() {
    this.router.navigate([
      'patient-info/states',
      {
        patientId: this.patientId,
      },
    ]);
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
    });
    toast.present();
  }

  private async presentToastErrorPostCustomState() {
    const toast = await this.toastController.create({
      message: 'No heu introduït cap estat',
      duration: 2000,
      position: 'middle',
    });
    toast.present();
  }

  private async presentStateSent() {
    const toast = await this.toastController.create({
      message: 'Nou estat enviat correctament',
      duration: 2000,
      position: 'middle',
    });
    toast.present();
  }
}