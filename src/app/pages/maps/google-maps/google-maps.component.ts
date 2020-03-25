import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input} from "@angular/core";
import { LocationDataService } from './location-data.service';
import { AuthProcessService } from '../../authentication/auth-service';

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

  @Input('height') height = "65vh";
  @Input("lat") lat : number; 
  @Input("lng") lng : number;  
  @Input("caseId") caseId : string;
  @Input("zoom") zoom: number;
  coordinates = new google.maps.LatLng(this.lat, this.lng);
  mapType: string = 'terrain';
  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 15,
    mapTypeId: 'terrain'
  };
  tracks: Tracks = null;
  shifts: Shift[] = null;
  mapPath: any[] = [{}];


  constructor(private locationService: LocationDataService,
              private aps: AuthProcessService) {}

  ngOnInit() {
    if(!this.lat && !this.lng){
      this.lat = 40.7686947;
      this.lng = -111.8449681;
    }
    if(!this.zoom)
      this.zoom = 15;
  }

  ngAfterViewInit(): void {
    this.refresh();
  }

  refresh(){
    this.aps.getIdToken().then(token =>{
      this.locationService.getPaths(this.caseId, token).subscribe(val => {
        this.extractPath(val)
      })
    })
  }

  extractPath(val) {
    let i;
    for(i= 0; i< val.paths.length; i++){
      let path: any[] = [];

      let pt;

      val.paths[i].forEach(pt => {
        let latlong: {} = {
          lat: pt.latitude,
          lng: pt.longitude
        };
        path.push(latlong);
      });

      let color = this.getRandomColor();

      this.mapPath.push({path: path, color: color});
    }
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
