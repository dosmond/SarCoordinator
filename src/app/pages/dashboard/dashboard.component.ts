import { PdfGenComponent } from './../pdf-gen/pdf-gen.component';
import { AuthProcessService } from './../authentication/auth-service';
import { ICases } from 'src/app/models/ICases';
import { ICase } from 'src/app/models/ICase';
import { ICaseIds } from 'src/app/models/ICaseIds';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, ReplaySubject } from 'rxjs';
import { RecentSalesWidgetOptions } from './widgets/recent-sales-widget/recent-sales-widget-options.interface';
import { DashboardService } from './dashboard.service';
import { MatDialog } from '@angular/material/dialog'
import { VolunteerFormDialogComponent } from '../forms/volunteer-form/volunteer-form.component';
import { CreateCaseFormDialogComponent } from '../forms/create-case-form/create-case-form.component';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import domtoimage from 'dom-to-image';

@Component({
  selector: 'fury-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private static isInitialLoad = true;
  data : any;

  caseOptions: RecentSalesWidgetOptions = {
    title: 'Cases',
    subTitle: 'A view of all cases'
  };
  caseTableOptions = {
    clickable: true,
    pageSize: 5,
    columns: [
      { name: 'Case Id', property: 'caseId', visible: false, isModelProperty: true},
      { name: 'Missing Person(s)', property: 'missingPersonName', visible: true, isModelProperty: true },
      { name: 'Date', property: 'date', visible: true, isModelProperty: true },
      { name: "Status", property: 'status', visible: true, isModelProperty: true}
    ]
  };
  caseDataObservable$ : Observable<any>;

  volunteerOptions: RecentSalesWidgetOptions = {
    title: 'Volunteers',
    subTitle: 'All registered volunteers'
  };
  volunteerTableOptions = {
    clickable: false,
    pageSize: 5,
    columns: [
      { name: 'Volunteer', property: 'name', visible: true, isModelProperty: true },
      { name: 'Role', property: 'roles', visible: true, isModelProperty: true },
      { name: 'Badge Number', property: 'badgeNumber', visible: true, isModelProperty: true },
    ]
  };
  volunteerDataObservable$ : Observable<any>;

  /**
   * Needed for the Layout
   */
  private _gap = 16;
  gap = `${this._gap}px`;

  constructor(public dialog: MatDialog,
              private dashboardService: DashboardService,
              private router: Router,
              private aps : AuthProcessService) {
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
    this.refreshCases();
    this.refreshVolunteers();
  }

  refreshCases() {
    this.caseDataObservable$ = of([{}]);
    let cases : ICases = {cases : []};
    this.aps.getIdToken().then(token => {
      this.dashboardService.getRecentSalesTableData(token).subscribe((res) => {
        this.data = (res as ICaseIds);
        this.data.caseIds.forEach(element => {
          this.dashboardService.getCaseData(element.caseId, token).subscribe(res => {
            let cdata = (res as ICase);
            cdata.caseId = element.caseId
            if(cdata.isOpen)
              cdata.status = "Open"
            else
              cdata.status = "Closed"
						var d = new Date(0);
						d.setUTCSeconds(cdata.date);
            cdata.date = d.toDateString();
            cases.cases.push(cdata);

            if(cases.cases.length == this.data.caseIds.length)
              this.caseDataObservable$ = of(cases.cases);
          })
        });
      })


    });
  }

  refreshVolunteers(){
    this.aps.getIdToken().then(token => {
      this.dashboardService.getVolunteers(token).subscribe(res => {
        let data = {volunteers: res}
        this.volunteerDataObservable$ = of(data.volunteers);
      })
    })
  }



htmltoPDF()
{
    // parentdiv is the html element which has to be converted to PDF
    html2canvas(document.querySelector("#parentdiv")).then(canvas => {

      var pdf = new jsPDF('p', 'pt', [canvas.width, canvas.height]);

      var imgData  = canvas.toDataURL("image/jpeg", 1.0);
      pdf.addImage(imgData,0,0,canvas.width, canvas.height);
      pdf.save('converteddoc.pdf');

  });

}

downloadPDF()
{

  var node = document.getElementById('parentdiv');

  var img;
  var filename;
  var newImage;


  domtoimage.toPng(node, { bgcolor: '#fff' })

    .then(function(dataUrl) {

      img = new Image();
      img.src = dataUrl;
      newImage = img.src;

      img.onload = function(){

      var pdfWidth = img.width;
      var pdfHeight = img.height;

        // FileSaver.saveAs(dataUrl, 'my-pdfimage.png'); // Save as Image

        var doc;

        if(pdfWidth > pdfHeight)
        {
          doc = new jsPDF('l', 'px', [pdfWidth , pdfHeight]);
        }
        else
        {
          doc = new jsPDF('p', 'px', [pdfWidth , pdfHeight]);
        }


        var width = doc.internal.pageSize.getWidth();
        var height = doc.internal.pageSize.getHeight();


        doc.addImage(newImage, 'PNG',  10, 10, width, height);
        filename = 'mypdf_' + '.pdf';
        doc.save(filename);

      };


    })
    .catch(function(error) {

     // Error Handling

    });



}
}
