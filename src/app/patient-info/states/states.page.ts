import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-states',
  templateUrl: './states.page.html',
  styleUrls: ['./states.page.scss'],
})
export class StatesPage implements OnInit {
  private admissionId: string;
  private initialStates: any = [];
  private stateAvailable = false;

  constructor(
    private api: ApiService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.admissionId = this.activatedRoute.snapshot.paramMap.get('admissionId');
    this.api.getAllStates(this.admissionId, 'ca').subscribe((result) => {
      this.initialStates = result;
      if (this.initialStates.length > 0) {
        this.stateAvailable = true;
      }
    });
  }
}
