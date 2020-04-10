import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ChartData } from 'chart.js';
import { Observable, of, from } from 'rxjs';
import { CaseDashboardService } from './case-dashboard.service';
import { ICase } from 'src/app/models/ICase';
import { CaseDataWidgetOptions } from '../widgets/case-data-widget/case-data-widget-options.interface';
import { AuthProcessService } from '../../authentication/auth-service';
import { fadeInUpStaggerAnimation } from 'src/@sar/animations/fade-in-up.animation';
import { fadeInRightAnimation } from 'src/@sar/animations/fade-in-right.animation';
import { MatDialog } from '@angular/material';
import { CreateCaseFormDialogComponent } from '../../forms/create-case-form/create-case-form.component';

@Component({
  selector: 'case-dashboard',
  templateUrl: './case-dashboard.component.html',
  styleUrls: ['./case-dashboard.component.scss'],
  animations: [fadeInUpStaggerAnimation, fadeInRightAnimation]
})
export class CaseDashboardComponent implements OnInit {

  private static isInitialLoad = true;
  height = "100%"
  data : ICase;
  caseId : string;
  missingPerson : string;
  reporterName : string;
  reporterPhone: string;
  caseName : string;
  caseNumber: string;

  volunteers$: Observable<any[]>;
  mapOptions = {
    zoom : 15
  }
  caseDataOptions: CaseDataWidgetOptions;
  caseDataTableOptions = {
    pageSize: 5,
    columns: [
      { name: 'Volunteer', property: 'name', visible: true, isModelProperty: true },
      { name: 'Role', property: 'roles', visible: true, isModelProperty: true },
      { name: 'Badge Number', property: 'badgeNumber', visible: true, isModelProperty: true },
      { name: 'Actions', property: 'actions', visible: true, isModelProperty: true },
    ]
  };
  
  /**
   * Needed for the Layout
   */
  private _gap = 16;
  gap = `${this._gap}px`;

  constructor(private dashboardService: CaseDashboardService,
              private afa: AuthProcessService,
              private router: Router,
              private routeParse: ActivatedRoute,
              public dialog: MatDialog) {
    /**
     * Edge wrong drawing fix
     * Navigate anywhere and on Promise right back
     */
    if (/Edge/.test(navigator.userAgent)) {
      if (CaseDashboardComponent.isInitialLoad) {
        this.router.navigate(['/apps/maps']).then(() => {
          this.router.navigate(['/']);
        });

        CaseDashboardComponent.isInitialLoad = false;
      }
    }

  }

  col(colAmount: number) {
    return `1 1 calc(${100 / colAmount}% - ${this._gap - (this._gap / colAmount)}px)`;
  }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.caseId = this.routeParse.snapshot.queryParamMap.get("caseId")

    // Initialize to avoid errors.
    this.caseDataOptions = {
      title: ``,
      id: ``,
      mp: ``,
      rp: '',
      rpPhone: '',
      subTitle: ''
    };

    this.afa.getIdToken().then(res => {
      let token = res
      this.dashboardService.getCaseData(this.caseId, token).subscribe(res => {
        this.data = (res as ICase);
        this.missingPerson = this.data.missingPersonName[0];
        this.reporterName = this.data.reporterName;
        this.reporterPhone = this.data.reporterPhone;
        this.caseName = this.data.caseName;
        this.volunteers$ = of(this.data.volunteers);
        this.caseNumber = this.data.caseNumber;
  
        this.caseDataOptions = {
          title: `Case Name: ${this.caseName}`,
          id: `Case Number: ${this.caseNumber}`,
          mp: `Missing Person: ${this.missingPerson}`,
          rp: `Reporting Person: ${this.reporterName}`,
          rpPhone: `RP Contact Phone: ${this.reporterPhone ? this.reporterPhone: ''}`,
        };
      });
    })
  }

  closecase(){
    this.afa.getIdToken().then(token => {
      this.dashboardService.closeCase(token, this.caseId).subscribe(res => {
      });
    })
  }

  editcase(){
    this.openEditCaseDialog();
  }

  openEditCaseDialog(): void{
    let caseWithId: any = this.data;
    caseWithId.caseId = this.caseId;
    const dialogRef = this.dialog.open(CreateCaseFormDialogComponent, {
      width: '30vw',
      minWidth: '300px',
      data: caseWithId
    });

    
    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined && result.created == true)
        this.refresh();
    });
  }
  

}
