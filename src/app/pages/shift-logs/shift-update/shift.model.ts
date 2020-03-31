import {Vehicle} from "../vehicle-list/vehicle.model";
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
    this.shiftId = shift.shiftId;
    this.day = shift.day;
    this.hours = shift.hours;
    this.start = this.convertTime(shift.startTime);

    this.end = "";
    if(shift.endTime) {
      this.end = this.convertTime(shift.endTime);
    }
    
    this.vehicles = [];
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
