import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartData } from 'chart.js';
import { Observable, of, from } from 'rxjs';
import { CaseDashboardService } from './case-dashboard.service';
import { ICase } from 'src/app/models/ICase';
import { CaseDataWidgetOptions } from '../widgets/case-data-widget/case-data-widget-options.interface';
import { AuthProcessService } from '../../authentication/auth-service';

@Component({
  selector: 'case-dashboard',
  templateUrl: './case-dashboard.component.html',
  styleUrls: ['./case-dashboard.component.scss']
})
export class CaseDashboardComponent implements OnInit {

  private static isInitialLoad = true;
  height = "100%"
  data : ICase;
  caseId : string;
  missingPerson : string;
  reporterName : string;
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
    ]
  };
  
  /**
   * Needed for the Layout
   */
  private _gap = 16;
  gap = `${this._gap}px`;

  constructor(private dashboardService: CaseDashboardService,
              private afa: AuthProcessService,
              private router: Router) {
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
    this.caseId = this.router.parseUrl(this.router.url).root.children.primary.segments[1].path;

    // Initialize to avoid errors.
    this.caseDataOptions = {
      title: ``,
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
        this.volunteers$ = of(this.data.volunteers);
  
        this.caseDataOptions = {
          title: `Case ID: ${this.caseId}`,
          mp: `Missing Person: ${this.missingPerson}`,
          rp: `Reporting Person: ${this.reporterName}`,
          rpPhone: 'RP Contact Phone: 555-123-4567',
          subTitle: 'All Volunteers on this case'
        };
      });
    })
    
  }

  

}
