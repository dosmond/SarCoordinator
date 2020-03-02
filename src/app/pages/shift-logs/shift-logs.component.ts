import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ListColumn } from '../../../@fury/shared/list/list-column.model';
import { ShiftUpdateComponent } from './shift-update/shift-update.component';
import { fadeInRightAnimation } from '../../../@fury/animations/fade-in-right.animation';
import { fadeInUpAnimation } from '../../../@fury/animations/fade-in-up.animation';
import { ConfirmationComponent } from '../components/confirmation/confirmation.component';
import { AuthProcessService } from '../authentication/auth-service';
import { ShiftLogService } from './shift-log.service';
import { Shift } from './shift-update/shift.model';
import { ActivatedRoute } from '@angular/router';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';

@Component({
  selector: 'shift-logs',
  templateUrl: './shift-logs.component.html',
  styleUrls: ['./shift-logs.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class ShiftLogsComponent implements OnInit, AfterViewInit, OnDestroy {

  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<Object[]> = new ReplaySubject<Shift[]>(1);
  data$: Observable<Object[]> = this.subject$.asObservable();
  volunteerName: string;
  caseName: string;
  caseId: string;
  userId: string;
  shiftsLoading: boolean;
  totalMiles: number;
  totalHours: number;

  @Input()
  columns: ListColumn[] = [
    { name: 'ShiftId', property: 'shiftId', visible: false},
    { name: 'Search Day', property: 'day', visible: true, isModelProperty: true},
    { name: 'Start Time', property: 'start', visible: true, isModelProperty: true },
    { name: 'End Time', property: 'end', visible: true, isModelProperty: true },
    { name: 'Hours Worked', property: 'hours', visible: true, isModelProperty: true },
    { name: 'Vehicles', property: 'showVehicles', visible: true},
    { name: 'Actions', property: 'actions', visible: true},
  ] as ListColumn[];
  pageSize = 10;
  dataSource: MatTableDataSource<Object> | null;
  shiftLogsObservable$ : Observable<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private dialog: MatDialog,
    private aps: AuthProcessService,
    private shiftLogService: ShiftLogService,
    private routeParse: ActivatedRoute) {
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  async ngOnInit() {
    this.caseId = this.routeParse.snapshot.queryParamMap.get("caseId");
    this.userId = this.routeParse.snapshot.queryParamMap.get("userId");
    this.volunteerName = this.routeParse.snapshot.queryParamMap.get("name");
    this.caseName = this.routeParse.snapshot.queryParamMap.get("caseName");

    this.refreshShifts();
  }

  ngOnChanges() {
    if(this.dataSource == null || this.dataSource.data.length == 0)
      this.shiftsLoading=true;
    else
      this.shiftsLoading=false;
  }

  refreshShifts() {
    this.shiftsLoading = true;
    this.aps.getIdToken().then(token => {
      this.shiftLogService.getShifts(token, this.caseId, this.userId).subscribe(res => {
        of(res).subscribe(shifts => {
          this.subject$.next(shifts as Shift[]);
          this.shiftsLoading = false;
        });

        this.dataSource = new MatTableDataSource();
  
        this.data$.pipe(
          filter(Boolean)
        ).subscribe((shifts: Object[]) => {
          this.totalHours = 0;
          this.totalMiles = 0;

          this.dataSource.data = shifts.map(shift => {
            // Sum miles and hours then add shift
            let _shift = new Shift(shift);
            this.totalHours += _shift.hours;
            _shift.vehicles.forEach(vehicle => {
              this.totalMiles += Number(vehicle.miles);
            });
            return _shift;
          });
        });
      });
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  showVehicles(vehicles) {
    const dialogRef = this.dialog.open(VehicleListComponent, {});
    dialogRef.componentInstance.vehicles = vehicles;
    dialogRef.componentInstance.totalMiles = this.totalMiles;
    dialogRef.afterClosed().subscribe(() => {

    });
  }

  updateShift(shift) {
    const dialogRef = this.dialog.open(ShiftUpdateComponent, {});
    dialogRef.componentInstance.hours = shift.hours;
    dialogRef.afterClosed().subscribe(newHours => {
      if(newHours >= 0) {
        this.aps.getIdToken().then(token => {
          this.shiftLogService.putHours(token, [{shiftId: shift.shiftId, newHours: newHours}])
          .subscribe(res => {
            this.refreshShifts();
          });
        });
      }
    });
  }

  deleteShift(shift) {
    const dialogRef = this.dialog.open(ConfirmationComponent, {});
    dialogRef.componentInstance.message = "Are you sure you want to delete this shift? It will be permanently lost.";
    dialogRef.componentInstance.btnCancelText = "Cancel";
    dialogRef.componentInstance.btnOkText = "Delete";
    dialogRef.componentInstance.isNegativeAction = true;

    dialogRef.afterClosed().subscribe(confirmed => {
      if(confirmed) {

        // delete this shift
      }
    });
  }

  ngOnDestroy() {
  }
}
