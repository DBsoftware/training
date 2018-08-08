import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopTrainingComponent } from './stop-training.component';
import { TrainigService } from '../trainig.service';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styles: []
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer: any;
  constructor(private dialog: MatDialog, private _trainigService: TrainigService) { }

  ngOnInit() {
    this.startOrResumetimer();
  }

  startOrResumetimer() {
    const step = this._trainigService.getRunningEx().duration / 100 * 1000;
    this.timer = setInterval( () => {
      this.progress = this.progress + 1;
      if (this.progress >= 100) {
        this._trainigService.completeExcercise();
        clearInterval(this.timer);
      }
    }, step);
  }

  onStop() {
    clearInterval(this.timer);
    this.dialog.open(StopTrainingComponent, {
      width: '250px',
      data: {progress: this.progress}
    }).afterClosed().subscribe(result => {
      if (result) {
        this._trainigService.cancelExcercise(this.progress);
      } else {
          this.startOrResumetimer();
      }

    });
  }


}
