import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'shift-update',
  templateUrl: './shift-update.component.html',
  styleUrls: ['./shift-update.component.scss']
})

export class ShiftUpdateComponent implements OnInit {

  @Input() hours: Number;

  constructor(private dialogRef: MatDialogRef<ShiftUpdateComponent>) {}

  ngOnInit() {
  }

  cancel() {
    this.dialogRef.close(-1);
  }

  updateHours() {
    // Calls putHours endpoint
    this.dialogRef.close(this.hours);
  }
}
