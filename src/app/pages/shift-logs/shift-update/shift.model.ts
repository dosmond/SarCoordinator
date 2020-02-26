import {Vehicle} from "../vehicle.model";

export class Shift {
  day: number;
  start: Date;
  end: Date;
  hours: number;
  vehicles: Vehicle[];

  constructor(shift) {
    this.day = shift.day;
    this.start = shift.start;
    this.end = shift.end;
    this.hours = shift.hours;
    this.vehicles = shift.vehicles.map(vehicle => new Vehicle(Vehicle));
  }
}
