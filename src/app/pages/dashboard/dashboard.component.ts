import { ICases } from 'src/app/models/ICases';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, ReplaySubject } from 'rxjs';
import { RecentSalesWidgetOptions } from './widgets/recent-sales-widget/recent-sales-widget-options.interface';
import { DashboardService } from './dashboard.service';
import { MatDialog } from '@angular/material/dialog'
import { VolunteerFormDialogComponent } from '../forms/volunteer-form/volunteer-form.component';

@Component({
  selector: 'fury-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private static isInitialLoad = true;
  data : any;
  caseData : any;
  recentSalesOptions: RecentSalesWidgetOptions = {
    title: 'Cases',
    subTitle: 'A view of all cases'
  };
  recentSalesTableOptions = {
    pageSize: 5,
    columns: [
      { name: 'Case', property: 'caseId', visible: true, isModelProperty: true },
    ]
  };
  tableData: {};
  tableDataObservable$ : Observable<any>;

  /**
   * Needed for the Layout
   */
  private _gap = 16;
  gap = `${this._gap}px`;

  constructor(public dialog: MatDialog,
              private dashboardService: DashboardService,
              private router: Router) {
    /**
     * Edge wrong drawing fix
     * Navigate anywhere and on Promise right back
     */
    if (/Edge/.test(navigator.userAgent)) {
      if (DashboardComponent.isInitialLoad) {
        this.router.navigate(['/apps/chat']).then(() => {
          this.router.navigate(['/']);
        });

        DashboardComponent.isInitialLoad = false;
      }
    }

  }

  col(colAmount: number) {
    return `1 1 calc(${100 / colAmount}% - ${this._gap - (this._gap / colAmount)}px)`;
  }

  ngOnInit() {
    this.tableData = {};
    this.tableDataObservable$ = of([{}]);
    this.dashboardService.getRecentSalesTableData().subscribe((res) => {
      this.data = (res as ICases[]);
      console.log(this.data)
      this.tableDataObservable$ = of(this.data.caseIds)
      
      //console.log(this.data)
      //this.tableData = (this.data.caseIds as ICases[]);
      //console.log(this.tableData)
      //this.tableDataObservable$ = of();
      //this.tableDataObservable$.subscribe(res => console.log(res))
    });
  }

  openVolunteerDialog(): void {
    const dialogRef = this.dialog.open(VolunteerFormDialogComponent, {
      width: '50vw'});

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
