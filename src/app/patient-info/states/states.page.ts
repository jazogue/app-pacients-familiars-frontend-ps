import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-states',
  templateUrl: './states.page.html',
  styleUrls: ['./states.page.scss'],
})
export class StatesPage implements OnInit {
  admissionId: string;
  initialStates: any = [];

  constructor(public api: ApiService, public activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.admissionId = this.activatedRoute.snapshot.paramMap.get('admissionId');
    this.api.getAllStates(this.admissionId, 'ca').subscribe((result) => {
      this.initialStates = result;
    });
  }
}
