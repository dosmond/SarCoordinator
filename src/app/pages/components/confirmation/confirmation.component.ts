import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})

export class ConfirmationComponent implements OnInit {
  confirmed: boolean;
  @Input() message: string;
  @Input() btnOkText: string;
  @Input() btnCancelText: string;
  @Input() isNegativeAction: boolean;

  constructor(public dialog: MatDialogRef<ConfirmationComponent>) {}

  ngOnInit() {
  }

  public cancel() {
    this.dialog.close({confrirmed: false})
  }

  public confirm() {
    this.dialog.close({confirmed: true})
  }

  onNoClick(): void {
    this.cancel()
  }
}