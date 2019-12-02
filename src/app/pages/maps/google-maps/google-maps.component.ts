import { Component, OnInit, ViewChild, ElementRef, AfterViewInit} from "@angular/core";
import { LocationDataService } from './location-data.service';

export interface Tracks {
  paths: [{
    locations: [{
      latitude: number,
      longitude: number
    }]
  }]
}

export interface Shift {
  caseId:string,
  endTime,
  startTime,
  totalTime: number,
  user: string,
  path: location[]
}
export interface location {
  _lat: number,
  _long: number,
}


@Component({
  selector: 'fury-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss']
})
export class GoogleMapsComponent implements OnInit, AfterViewInit {
  
  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;
  map: google.maps.Map;

  lat: number = 40.7686947;
  lng: number = -111.8449681;
  coordinates = new google.maps.LatLng(this.lat, this.lng);
  mapType: string = 'terrain';
  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 15,
    mapTypeId: 'terrain'
  };
  tracks: Tracks = null;
  shifts: Shift[] = null;
  mapPath: number[][] = null;


  constructor(private locationService: LocationDataService) {}

  ngOnInit() {
    

  }

  ngAfterViewInit(): void {
    this.mapInitializer();

    this.locationService.getPathsDirect()
    .subscribe(val => this.extractPath(val));
  }

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
   }

  extractPath(val) {
    this.shifts = val;
    let i;
    for(i= 0; i<this.shifts.length; i++){
      let path:google.maps.LatLng[] = [];
    //   let path = this.shifts[i].path;
    //  // await this.addPathOnMap(path)
    //   this.mapPath = [];
       let pt;
       for(pt of this.shifts[i].path){ //geolocation
        let latlong: google.maps.LatLng = new google.maps.LatLng({
          lat: pt._lat,
          lng: pt._long
        });
        path.push(latlong);
    //     let point: number[] = [pt.longitude, pt.latitude]
    //     this.mapPath.push(point);
       }
      this.addPathOnMap(path);
    }
  }

  /*
  * Adds a single path on the map as a polyline
  */
  addPathOnMap(p: google.maps.LatLng[]) {
    new google.maps.Polyline({
      path: p,
      strokeWeight: 2,
      strokeColor: '#ff0000'
    }).setMap(this.map);
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

}
