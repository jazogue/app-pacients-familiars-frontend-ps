import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add-resources',
  templateUrl: './add-resources.page.html',
  styleUrls: ['./add-resources.page.scss'],
})
export class AddResourcesPage implements OnInit {
  private genericStateCa: string;
  private genericStateEs: string;
  private genericStateEn: string;
  private locationName;
  private locations: any = [];
  private selectedLocation: any = null;
  private showStateOrLocation = '';

  constructor(
    private toastController: ToastController,
    private api: ApiService
  ) {}

  ngOnInit() {
    this.api.getLocations().subscribe((result) => {
      this.locations = result;
    });
  }

  createLocation() {
    if (this.locationName === '' || this.locationName == null) {
      this.presentToastErrorPostLocation();
    } else {
      this.api.postLocation(this.locationName).subscribe((result) => {
        this.api.getLocations().subscribe((result2) => {
          this.locations = result2;
        });
      });
      this.presentLocationSent();
    }
  }

  createGenericState() {
    if (
      this.genericStateCa === '' ||
      this.genericStateCa == null ||
      this.genericStateEs === '' ||
      this.genericStateEs == null ||
      this.genericStateEn === '' ||
      this.genericStateEn == null
    ) {
      this.presentToastErrorGenericState();
    } else if (this.selectedLocation == null) {
      this.presentToastErrorSelectedLocation();
    } else {
      this.api
        .postNewGenericState(this.selectedLocation.locationId)
        .subscribe((result: any) => {
          this.api.postTranslation(result.id, this.genericStateCa, 'ca');
          this.api.postTranslation(result.id, this.genericStateEs, 'es');
          this.api.postTranslation(result.id, this.genericStateEn, 'en');
        });
      this.presentGenericStateSent();
    }
  }

  private async presentToastErrorPostLocation() {
    const toast = await this.toastController.create({
      message: 'No has introduït cap localització',
      duration: 2000,
      position: 'middle',
      color: 'secondary',
    });
    toast.present();
  }

  private async presentToastErrorGenericState() {
    const toast = await this.toastController.create({
      message: 'Introdueixi tots els estats en tots els idiomes',
      duration: 2000,
      position: 'middle',
      color: 'secondary',
    });
    toast.present();
  }

  private async presentToastErrorSelectedLocation() {
    const toast = await this.toastController.create({
      message: 'Seleccioni una localització',
      duration: 2000,
      position: 'middle',
      color: 'secondary',
    });
    toast.present();
  }

  private async presentGenericStateSent() {
    const toast = await this.toastController.create({
      message: 'Nou estat genèric creat correctament',
      duration: 2000,
      position: 'middle',
      color: 'primary',
    });
    toast.present();
  }

  private async presentLocationSent() {
    const toast = await this.toastController.create({
      message: 'Nova localització creada correctament',
      duration: 2000,
      position: 'middle',
      color: 'primary',
    });
    toast.present();
  }
}
