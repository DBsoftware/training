import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Excercise } from '../excercise.model';
import { TrainigService } from '../trainig.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styles: []
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = ['date', 'name', 'calories', 'duration'];
  dataSource: MatTableDataSource<Excercise> = new MatTableDataSource();
  subscription: Subscription = new Subscription();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _trainigService: TrainigService) { }

  ngOnInit() {
    this.subscription = this._trainigService.finishedExercisesChanged
    .subscribe(res => {
      this.dataSource.data = res;
      console.log(res);
    });
    this._trainigService.getCompletedOrCanceledExcercises();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
