import { OnInit, Component, Input } from '@angular/core';
import { Vehicle } from './vehicle.model';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss'],
})
export class VehicleListComponent implements OnInit {

  @Input() vehicles: Vehicle[];
  displayColumns: String[];
  totalMiles: number;

  constructor(private dialogRef: MatDialogRef<VehicleListComponent>) {
  }

  ngOnInit() {
    this.displayColumns = ['type', 'isCountyVehicle', 'isPersonalVehicle', 'miles'];

    this.totalMiles = 0;
    this.vehicles.forEach(vehicle => {
      this.totalMiles += Number(vehicle.miles);
    });
  }

  cancel() {
    this.dialogRef.close();
  }
}
