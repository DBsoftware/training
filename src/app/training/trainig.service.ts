
import { Injectable } from '@angular/core';
import { Excercise } from './excercise.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class TrainigService {
  excerciseChanged = new Subject<Excercise>();
  private runningExcercise: Excercise;
  availableExcersices: Excercise[] = [];
  exerciseChanged = new Subject<Excercise>();
  exercisesChanged = new Subject<Excercise[]>();
  finishedExercisesChanged = new Subject<Excercise[]>();
  finishedExcersices: Excercise[] = [];
  // VOY EN CLASE 77
  constructor(private db: AngularFirestore) {
  }

  getAvailableExcercises() {
    return this.db.collection('availableExcercises')
    .snapshotChanges()
    .pipe(
      map(docArray =>
        docArray.map(doc => ({ id: doc.payload.doc.id, ...doc.payload.doc.data()}) ))
    )
    .subscribe((exercises: Excercise[]) => {
      this.availableExcersices = exercises;
      this.exercisesChanged.next([...this.availableExcersices]);
    });
  }

  startExcercise(selectedId: string) {
    this.runningExcercise = this.availableExcersices.find(ex => ex.id === selectedId);
    this.excerciseChanged.next( this.getRunningEx() );
  }

  getRunningEx () {
    return { ...this.runningExcercise };
  }

  completeExcercise() {
    this.addDataToDB({...this.runningExcercise, state: 'completed', date: new Date() });
    this.runningExcercise = null;
    this.excerciseChanged.next(null);
  }

  cancelExcercise(progress: number) {
    this.addDataToDB({...this.runningExcercise,
                          state: 'cancelled',
                          calories: this.runningExcercise.duration * (progress / 100),
                          duration: this.runningExcercise.calories * (progress / 100),
                          date: new Date() });
    this.runningExcercise = null;
    this.excerciseChanged.next(null);
  }

  getCompletedOrCanceledExcercises =
  () => this.db.collection('finishedExcercises')
  .valueChanges()
  .subscribe(
    (ex: Excercise[]) =>
    this.finishedExercisesChanged.next(ex)
  )


  private addDataToDB(obj: Excercise) {
    this.db.collection('finishedExcercises').add(obj);
  }

}
