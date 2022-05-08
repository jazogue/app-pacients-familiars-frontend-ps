import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-states',
  templateUrl: './states.page.html',
  styleUrls: ['./states.page.scss'],
})
export class StatesPage implements OnInit {
  patientId: string;
  initialStates: any = [];

  constructor(public api: ApiService, public activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.patientId = this.activatedRoute.snapshot.paramMap.get('patientId');
    this.api.getAllStates(this.patientId).subscribe((result) => {
      this.initialStates = result;
    });
  }
}
