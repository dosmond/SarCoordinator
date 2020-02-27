import {Vehicle} from "../vehicle.model";
import * as moment from 'moment';

export class Shift {
  shiftId: string;
  appVersion: string;
  day: number;
  start: string;
  end: string;
  hours: number;
  vehicles: Vehicle[];

  constructor(shift) {
    this.day = shift.day;
    this.start = this.convertTime(shift.startTime);
    this.end = this.convertTime(shift.endTime);
    this.hours = shift.hours;

    if(shift.vehicles) {
      this.vehicles = shift.vehicles.map(vehicle => new Vehicle(vehicle));
    }
  }

  convertTime(utcSeconds) {
    var d = new Date(0);
    d.setUTCSeconds(utcSeconds);
    return moment(d).format("lll");
  }
}
