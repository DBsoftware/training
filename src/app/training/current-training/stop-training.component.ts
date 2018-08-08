import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-stop-training',
  templateUrl: './stop-training.component.html',
  styles: []
})
export class StopTrainingComponent {
  constructor(
    public dialogRef: MatDialogRef<StopTrainingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
