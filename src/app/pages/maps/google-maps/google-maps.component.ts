import { Component, OnInit, ViewChild, ElementRef, AfterViewInit} from "@angular/core";
import { LocationDataService } from './location-data.service';

@Component({
  selector: 'fury-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss']
})
export class GoogleMapsComponent implements OnInit, AfterViewInit {
  
  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;
  map: google.maps.Map;

  lat: number = 40.730610;
  lng: number = -73.935242;
  coordinates = new google.maps.LatLng(this.lat, this.lng);
  mapType: string = 'terrain';
  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 8,
  };

  constructor(private locationService: LocationDataService) {}

  ngOnInit() {
    
  }

  ngAfterViewInit(): void {
    this.mapInitializer();
  }

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, 
    this.mapOptions);
   }

}
