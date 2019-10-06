import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  OnDestroy
} from "@angular/core";
import { loadModules } from "esri-loader";
import esri = __esri; // Esri TypeScript Types
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
  path: [Geolocation]
}

@Component({
  selector: 'fury-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss']
})
export class GoogleMapsComponent implements OnInit , OnDestroy{
  @Output() mapLoadedEvent = new EventEmitter<boolean>();

  // The <div> where we will place the map
  @ViewChild("mapViewNode", { static: true }) private mapViewEl: ElementRef;

  /**
   * _zoom sets map zoom
   * _center sets map center
   * _basemap sets type of map
   * _loaded provides map loaded status
   */
  private _zoom = 16;
  private _center: Array<number> = [-111.8493978, 40.7661535];
  private _basemap = "satellite";
  private _loaded = false;
  private _view: esri.MapView = null;
  private _map: esri.Map = null;
  tracks: Tracks = null;
  shifts: Shift[] = null;
  mapPath: number[][] = null;
  graphicsLayer;

  // get paths() {
  //   return this._paths;
  // }

  get map(): esri.Map {
    return this._map;
  }

  get mapLoaded(): boolean {
    return this._loaded;
  }

  @Input()
  set zoom(zoom: number) {
    this._zoom = zoom;
  }

  get zoom(): number {
    return this._zoom;
  }

  @Input()
  set center(center: Array<number>) {
    this._center = center;
  }

  get center(): Array<number> {
    return this._center;
  }

  @Input()
  set basemap(basemap: string) {
    this._basemap = basemap;
  }

  get basemap(): string {
    return this._basemap;
  }

  constructor(private locationService: LocationDataService) {}

  async initializeMap() {
    try {
      // Load the modules for the ArcGIS API for JavaScript
      const [EsriMap, EsriMapView] = await loadModules([
        "esri/Map",
        "esri/views/MapView",
        "esri/layers/GraphicsLayer",
        "esri/geometry/Point",
        'esri/symbols/SimpleMarkerSymbol',
        'esri/Graphic',
        'esri/geometry/Polyline',
        'esri/symbols/LineSymbol'
      ]);

      // Configure the Map
      const mapProperties: esri.MapProperties = {
        basemap: this._basemap
      };

      const map: esri.Map = new EsriMap(mapProperties);
     
      
      // Initialize the MapView
      const mapViewProperties: esri.MapViewProperties = {
        container: this.mapViewEl.nativeElement,
        center: this._center,
        zoom: this._zoom,
        map: map
      };

      this._view = new EsriMapView(mapViewProperties);
      this._map = map;
      await this._view.when();
      return this._view;
    } catch (error) {
      console.log("EsriLoader: ", error);
    }
  }

  refresh(){
    this.locationService.getPathsDirect()
    .subscribe(val => this.extractPath(val));
  }

  async extractPath(val) {
    this.shifts = val;
    let i;
    for(i= 0; i<this.shifts.length; i++){
      let path = this.shifts[i].path;
      this.mapPath = [];
      let pt;
      for(pt of path){
        let point: number[] = [pt.longitude, pt.latitude]
        this.mapPath.push(point);
      }
      await this.addPathOnMap();
    }
  }

  /*
  * 
  */
  async addPathOnMap() {
    
    // this.locationService.getPaths()
    // .subscribe((data: Tracks)=>this.tracks = {
    //   paths : data['paths']
    // });

    const [EsriGraphicsLayer, EsriPoint, EsriSimpleMarkerSymbol, EsriGraphic, EsriPolyline, EsriLineSymbol] = await loadModules([
      "esri/layers/GraphicsLayer",
      "esri/geometry/Point",
      'esri/symbols/SimpleMarkerSymbol',
      'esri/Graphic',
      'esri/geometry/Polyline',
      'esri/symbols/LineSymbol'
    ]);
    const map: esri.Map = this.map;

    const gL = new EsriGraphicsLayer();
    map.add(gL);
    const m = new EsriSimpleMarkerSymbol();
    const p = new EsriPoint({latitude: 40.7661535, longitude: -111.8493978})
    const g = new EsriGraphic({geometry: p, symbol: m});
    
    const poly = new EsriPolyline({
      type: 'poyline', 
      paths: this.mapPath 
    });

    const lineSymbol = new EsriLineSymbol({
      type: 'simple-line', 
      color: [226, 119, 40], 
      width: 1});

    const lineGraphic = new EsriGraphic({
      geometry: poly,
      symbol: lineSymbol
    });

    gL.add(g);
    gL.add(lineGraphic);
  }

  ngOnInit() {

    // Initialize MapView and return an instance of MapView
    this.initializeMap().then(mapView => {
      // The map has been initialized
      console.log("mapView ready: ", this._view.ready);
      this._loaded = this._view.ready;
      this.mapLoadedEvent.emit(true);
    });


  }

  ngOnDestroy() {
    if (this._view) {
      // destroy the map view
      this._view.container = null;
    }
  }

}
