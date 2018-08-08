import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TrainigService } from './trainig.service';


@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styles: []
})
export class TrainingComponent implements OnInit, OnDestroy {
  ongoingTraining = false;
  subscription: Subscription = new Subscription();

  constructor(private _trainigService: TrainigService) { }

  ngOnInit() {
    this.subscription = this._trainigService.excerciseChanged
    .subscribe(res => this.ongoingTraining = (res !== undefined && res !== null)  );
  }

  ngOnDestroy() {

  }

}
