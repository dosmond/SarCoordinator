import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'pdf-gen',
  templateUrl: './pdf-gen.component.html',
  styleUrls: ['./pdf-gen.component.scss']
})
export class PdfGenComponent implements OnInit {

  pdfSrc = "../../../assets/report.pdf";

  constructor() { }

  ngOnInit() {
  }

}
