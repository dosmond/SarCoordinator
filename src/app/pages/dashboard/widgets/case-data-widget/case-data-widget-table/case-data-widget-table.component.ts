import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ListColumn } from '../../../../../../@fury/shared/list/list-column.model';
import { Router } from '@angular/router';

@Component({
  selector: 'case-data-widget-table',
  templateUrl: './case-data-widget-table.component.html',
  styleUrls: ['./case-data-widget-table.component.scss']
})
export class CaseDataWidgetTableComponent implements OnInit, AfterViewInit {

  @Input() columns: ListColumn[];
  @Input() pageSize = 10;
  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  data$: Observable<any[]> = this.subject$.asObservable();
  dataSource: MatTableDataSource<any> | null;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private dialog: MatDialog,
              private router : Router) {
  }

  @Input() set data(value: any[]) {
    this.subject$.next(value);
  };

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  navigate(row: any){
    this.router.navigate([`case-dashboard/${row.caseid}`]);
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();

    this.data$.pipe(
      filter(Boolean)
    ).subscribe((values) => this.dataSource.data = values);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
