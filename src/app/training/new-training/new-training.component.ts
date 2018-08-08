import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainigService } from '../trainig.service';
import { Excercise } from '../excercise.model';
import { Observable } from '../../../../node_modules/rxjs';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styles: [`
    .new-training {
      padding: 30px;
    }`
  ]
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  excersizes: Excercise[];
  exerciseSubscription: Subscription;

  constructor(private _trainigService: TrainigService) {}

  ngOnInit() {
    this.exerciseSubscription = this._trainigService.exercisesChanged.subscribe(
      exercises => (this.excersizes = exercises)
    );
    this._trainigService.getAvailableExcercises();
  }

  onStartTraining(EX_id: any) {
    if (EX_id._value) {
      this._trainigService.startExcercise(EX_id._value);
    }
  }


  ngOnDestroy() {
    this.exerciseSubscription.unsubscribe();
  }
}
