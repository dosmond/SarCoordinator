export class Vehicle {
    type: string;
    miles: number;
    isCountyVehicle: boolean;
    isPersonalVehicle: boolean;

    constructor(vehicle) {
        this.type = vehicle.type;
        this.miles = vehicle.milesTraveled;
        this.isCountyVehicle = vehicle.isCountyVehicle;
        this.isPersonalVehicle = vehicle.isPersonalVehicle;
      }
}