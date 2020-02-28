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

@Component({
  selector: 'fury-all-in-one-table',
  templateUrl: './all-in-one-table.component.html',
  styleUrls: ['./all-in-one-table.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class AllInOneTableComponent implements OnInit, AfterViewInit, OnDestroy {

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
  shiftsLoading: boolean; // TODO make spinner

  @Input()
  columns: ListColumn[] = [
    { name: 'Search Day', property: 'day', visible: true, isModelProperty: true},
    { name: 'Start Time', property: 'start', visible: true, isModelProperty: true },
    { name: 'End Time', property: 'end', visible: true, isModelProperty: true },
    { name: 'Hours Worked', property: 'hours', visible: true, isModelProperty: true },
    { name: 'Vehicle', property: 'vehicles[0].miles', visible: true, isModelProperty: true},
    { name: 'Actions', property: 'actions', visible: true},
  ] as ListColumn[];
  subColumns: ListColumn[] = []
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
          this.dataSource.data = shifts.map(shift => new Shift(shift));
        });
      });
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  updateShift(shift) {
    const dialogRef = this.dialog.open(ShiftUpdateComponent, {});
    dialogRef.componentInstance.hours = shift.hours;
    dialogRef.afterClosed().subscribe(newHours => {
      if(newHours >= 0) {
        // update hours in shift
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
