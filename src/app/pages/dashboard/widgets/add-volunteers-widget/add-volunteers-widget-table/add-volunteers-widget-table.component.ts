import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ListColumn } from '../../../../../../@sar/shared/list/list-column.model';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { IUser } from 'src/app/models/IUser';

@Component({
  selector: 'add-volunteers-widget-table',
  templateUrl: './add-volunteers-widget-table.component.html',
  styleUrls: ['./add-volunteers-widget-table.component.scss']
})
export class AddVolunteersWidgetTableComponent implements OnInit, AfterViewInit {

  @Input() columns: ListColumn[];
  @Input() pageSize = 10;
  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  data$: Observable<any[]> = this.subject$.asObservable();
  dataSource: MatTableDataSource<any> | null;
  @Input() selection = new SelectionModel<IUser>(true, []);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private dialog: MatDialog,
              private router : Router) {
  }

  @Input() set data(value: any[]) {
    this.subject$.next(value);
  };

  @Input() clickable : boolean = true;

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  navigate(row: any){
    this.router.navigate([`case-dashboard/${row.caseId}`]);
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.data$.pipe(
      filter(Boolean)
    ).subscribe((values : any[]) => this.dataSource.data = values);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: IUser): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.name}`;
  }


}
